/**
 * fetch-unsplash-images.mjs
 * Script executado pelo workflow generate-post-images.yml
 *
 * - Lê src/data/posts.ts para extrair slugs, títulos, categorias e tags
 * - Para cada post, busca uma imagem relevante na Unsplash API
 * - Baixa a imagem (1200x630px) e salva em public/images/posts/<slug>.jpg
 * - Gera public/images/posts/index.json com metadados de todas as imagens
 * - Pula posts que já têm imagem (a menos que FORCE_ALL=true)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
const FORCE_ALL = process.env.FORCE_ALL === 'true';
const SPECIFIC_SLUG = process.env.SPECIFIC_SLUG?.trim() || '';
const OUTPUT_DIR = 'public/images/posts';
const INDEX_FILE = join(OUTPUT_DIR, 'index.json');

// Orientações de busca por categoria do blog (português → inglês para Unsplash)
const CATEGORY_HINTS = {
  'Produtividade': 'productivity focus work desk',
  'Mentalidade': 'mindset growth thinking person',
  'Clareza': 'clarity light minimalist calm',
  'Execução': 'action execution momentum forward',
  'Hábitos': 'habit routine daily practice',
  'Motivação': 'motivation energy sunrise determination',
  'Disciplina': 'discipline training consistency athlete',
};

// Mapeamento de termos PT → EN para melhorar busca no Unsplash
const PT_TO_EN = {
  'paralisia por análise': 'analysis paralysis decision',
  'tomada de decisão': 'decision making choice',
  'produtividade': 'productivity focus',
  'sistemas': 'systems organization',
  'hábitos': 'habits routine',
  'disciplina': 'discipline consistency',
  'consistência': 'consistency progress',
  'clareza mental': 'mental clarity focus',
  'prioridades': 'priorities planning',
  'insight': 'insight idea lightbulb',
  'execução': 'execution action',
  'metas': 'goals achievement',
  'objetivos': 'objectives planning',
  'mentalidade': 'mindset growth',
  'motivação': 'motivation energy',
  'autocrítica': 'self improvement reflection',
  'rotina': 'routine daily habits',
  'organização': 'organization planning',
  'comportamento': 'behavior change',
  'revisão semanal': 'weekly review planning',
};

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function translateTags(tags) {
  const translated = [];
  for (const tag of tags) {
    const lower = tag.toLowerCase();
    if (PT_TO_EN[lower]) {
      translated.push(PT_TO_EN[lower]);
    } else {
      translated.push(tag);
    }
  }
  return translated;
}

async function fetchUnsplashImage(query, orientation = 'landscape') {
  const url = new URL('https://api.unsplash.com/photos/random');
  url.searchParams.set('query', query);
  url.searchParams.set('orientation', orientation);
  url.searchParams.set('content_filter', 'high');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
      'Accept-Version': 'v1',
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Unsplash API error ${res.status}: ${body}`);
  }

  return res.json();
}

async function downloadImage(imageUrl, destPath) {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  writeFileSync(destPath, Buffer.from(arrayBuffer));
}

function buildSearchQuery(post) {
  // 1. Tentar tags traduzidas
  const translatedTags = translateTags(post.tags || []);

  // 2. Hint de categoria
  const categoryHint = CATEGORY_HINTS[post.category] || 'motivation success';

  // Combinar primeira tag traduzida + hint de categoria
  if (translatedTags.length > 0) {
    return `${translatedTags[0]} ${categoryHint}`;
  }

  return categoryHint;
}

async function main() {
  if (!UNSPLASH_API_KEY) {
    console.error('❌ UNSPLASH_API_KEY não definida! Configure como secret no repositório.');
    process.exit(1);
  }

  // Criar diretório de saída
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Diretório criado: ${OUTPUT_DIR}`);
  }

  // Ler metadados extraídos pelo passo anterior
  const postsMetaPath = '/tmp/posts-meta.json';
  if (!existsSync(postsMetaPath)) {
    console.error('❌ /tmp/posts-meta.json não encontrado. Execute o passo de extração antes.');
    process.exit(1);
  }

  const allPosts = JSON.parse(readFileSync(postsMetaPath, 'utf-8'));

  // Filtrar por slug específico, se informado
  const posts = SPECIFIC_SLUG
    ? allPosts.filter(p => p.slug === SPECIFIC_SLUG)
    : allPosts;

  if (posts.length === 0) {
    console.warn(`⚠️ Nenhum post encontrado${SPECIFIC_SLUG ? ` com slug "${SPECIFIC_SLUG}"` : ''}.`);
    process.exit(0);
  }

  // Carregar índice existente (para não buscar novamente o que já foi buscado)
  let index = {};
  if (existsSync(INDEX_FILE)) {
    index = JSON.parse(readFileSync(INDEX_FILE, 'utf-8'));
  }

  const results = { ...index };
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const post of posts) {
    const destPath = join(OUTPUT_DIR, `${post.slug}.jpg`);
    const alreadyExists = existsSync(destPath);

    if (alreadyExists && !FORCE_ALL) {
      console.log(`⏭️  Pulando "${post.slug}" (imagem já existe)`);
      skipped++;
      continue;
    }

    const query = buildSearchQuery(post);
    console.log(`\n🔍 Buscando imagem para "${post.slug}"`);
    console.log(`   Query: "${query}"`);

    try {
      // Buscar metadados da foto no Unsplash
      const photo = await fetchUnsplashImage(query);

      // URL com parâmetros para 1200x630 (ideal para OG image / blog cover)
      const imageUrl = `${photo.urls.raw}&w=1200&h=630&fit=crop&crop=entropy&fm=jpg&q=85`;

      console.log(`   📸 Foto: ${photo.id} por @${photo.user.username}`);
      console.log(`   🔗 URL: ${photo.links.html}`);

      // Baixar e salvar
      await downloadImage(imageUrl, destPath);
      console.log(`   ✅ Salvo em ${destPath}`);

      // Registrar no índice
      results[post.slug] = {
        slug: post.slug,
        localPath: `/images/posts/${post.slug}.jpg`,
        unsplashId: photo.id,
        unsplashUrl: photo.links.html,
        photographer: photo.user.name,
        photographerUsername: photo.user.username,
        photographerProfile: photo.user.links.html,
        description: photo.description || photo.alt_description || '',
        query: query,
        fetchedAt: new Date().toISOString(),
      };

      downloaded++;

      // Respeitar rate limit da Unsplash (50 req/h em plano free)
      // Aguarda 2s entre requisições para não estourar limite
      if (downloaded < posts.length) {
        await sleep(2000);
      }
    } catch (err) {
      console.error(`   ❌ Erro ao processar "${post.slug}": ${err.message}`);
      failed++;

      // Em caso de rate limit (403/429), aguardar mais
      if (err.message.includes('403') || err.message.includes('429')) {
        console.warn('   ⏳ Rate limit detectado. Aguardando 60s...');
        await sleep(60000);
      }
    }
  }

  // Salvar índice atualizado
  writeFileSync(INDEX_FILE, JSON.stringify(results, null, 2));
  console.log(`\n📝 Índice salvo em ${INDEX_FILE}`);

  // Relatório final
  console.log('\n=== Relatório Final ===');
  console.log(`✅ Baixadas: ${downloaded}`);
  console.log(`⏭️  Puladas:  ${skipped}`);
  console.log(`❌ Falhas:   ${failed}`);
  console.log(`📦 Total:    ${posts.length}`);

  if (failed > 0) {
    console.warn('\n⚠️ Algumas imagens falharam. Verifique os logs acima.');
    // Não falhar o workflow por isso; imagens parciais ainda são úteis
  }
}

main().catch(err => {
  console.error('❌ Erro fatal:', err);
  process.exit(1);
});
