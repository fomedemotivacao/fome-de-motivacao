/**
 * fetch-unsplash-images.mjs
 * Script executado pelo workflow generate-post-images.yml
 *
 * - Lê /tmp/posts-meta.json (extraído do posts.ts pelo workflow)
 * - Para cada post, chama OpenRouter (modelo gratuito) para gerar
 *   uma query de busca em inglês otimizada para o Unsplash
 * - Busca a imagem na Unsplash API com essa query
 * - Baixa 1200x630px e salva em public/images/posts/<slug>.jpg
 * - Gera public/images/posts/index.json com metadados
 * - Pula posts que já têm imagem (a menos que FORCE_ALL=true)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const FORCE_ALL = process.env.FORCE_ALL === 'true';
const SPECIFIC_SLUG = process.env.SPECIFIC_SLUG?.trim() || '';
const OUTPUT_DIR = 'public/images/posts';
const INDEX_FILE = join(OUTPUT_DIR, 'index.json');

// Modelos gratuitos do OpenRouter em ordem de preferência
// Referência: https://openrouter.ai/models?order=pricing-low-to-high
const FREE_MODELS = [
  'meta-llama/llama-3.1-8b-instruct:free',
  'mistralai/mistral-7b-instruct:free',
  'google/gemma-2-9b-it:free',
  'microsoft/phi-3-mini-128k-instruct:free',
];

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/**
 * Chama o OpenRouter com fallback entre modelos gratuitos.
 * Retorna uma query em inglês de 3-5 palavras para o Unsplash.
 */
async function generateSearchQuery(post) {
  const prompt = `You are a professional image search assistant.
Given a blog post in Portuguese, generate a short English search query (3-5 words) for Unsplash that best represents the post visually. Return ONLY the search query, nothing else.

Post title: "${post.title}"
Category: "${post.category}"
Tags: ${(post.tags || []).join(', ')}`;

  for (const model of FREE_MODELS) {
    try {
      console.log(`   🤖 OpenRouter model: ${model}`);
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://github.com/fomedemotivacao/website-and-blog',
          'X-Title': 'fomedemotivacao blog image workflow',
        },
        body: JSON.stringify({
          model,
          max_tokens: 30,
          temperature: 0.7,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.warn(`   ⚠️ Modelo ${model} falhou (${res.status}): ${body}`);
        continue; // tenta próximo modelo
      }

      const data = await res.json();
      const query = data.choices?.[0]?.message?.content?.trim();

      if (!query) {
        console.warn(`   ⚠️ Modelo ${model} retornou query vazia.`);
        continue;
      }

      // Remover aspas ou pontuação desnecessária
      return query.replace(/^["']|["']$/g, '').trim();

    } catch (err) {
      console.warn(`   ⚠️ Erro no modelo ${model}: ${err.message}`);
    }
  }

  // Fallback final: usar título traduzido de forma simplificada
  console.warn('   ⚠️ Todos os modelos falharam. Usando fallback baseado na categoria.');
  return fallbackQuery(post);
}

/**
 * Fallback estático caso o OpenRouter esteja indisponível.
 */
function fallbackQuery(post) {
  const categoryMap = {
    'Produtividade': 'productivity focus work',
    'Mentalidade': 'mindset growth person',
    'Clareza': 'clarity light minimalist',
    'Execução': 'action momentum forward',
    'Hábitos': 'habit routine practice',
    'Motivação': 'motivation energy sunrise',
    'Disciplina': 'discipline consistency training',
  };
  return categoryMap[post.category] || 'motivation success inspiration';
}

async function fetchUnsplashImage(query) {
  const url = new URL('https://api.unsplash.com/photos/random');
  url.searchParams.set('query', query);
  url.searchParams.set('orientation', 'landscape');
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

async function main() {
  if (!UNSPLASH_API_KEY) {
    console.error('❌ UNSPLASH_API_KEY não definida! Configure como secret no repositório.');
    process.exit(1);
  }

  if (!OPENROUTER_API_KEY) {
    console.warn('⚠️ OPENROUTER_API_KEY não definida. Usando fallback estático para queries.');
  }

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Diretório criado: ${OUTPUT_DIR}`);
  }

  const postsMetaPath = '/tmp/posts-meta.json';
  if (!existsSync(postsMetaPath)) {
    console.error('❌ /tmp/posts-meta.json não encontrado. Execute o passo de extração antes.');
    process.exit(1);
  }

  const allPosts = JSON.parse(readFileSync(postsMetaPath, 'utf-8'));

  const posts = SPECIFIC_SLUG
    ? allPosts.filter(p => p.slug === SPECIFIC_SLUG)
    : allPosts;

  if (posts.length === 0) {
    console.warn(`⚠️ Nenhum post encontrado${SPECIFIC_SLUG ? ` com slug "${SPECIFIC_SLUG}"` : ''}.`);
    process.exit(0);
  }

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

    console.log(`\n📝 Processando "${post.slug}"`);
    console.log(`   Título: ${post.title}`);

    try {
      // 1. Gerar query via OpenRouter (com fallback automático)
      const query = OPENROUTER_API_KEY
        ? await generateSearchQuery(post)
        : fallbackQuery(post);

      console.log(`   🔍 Query gerada: "${query}"`);

      // 2. Buscar foto no Unsplash
      const photo = await fetchUnsplashImage(query);
      const imageUrl = `${photo.urls.raw}&w=1200&h=630&fit=crop&crop=entropy&fm=jpg&q=85`;

      console.log(`   📸 Foto: ${photo.id} por @${photo.user.username}`);
      console.log(`   🔗 ${photo.links.html}`);

      // 3. Baixar e salvar
      await downloadImage(imageUrl, destPath);
      console.log(`   ✅ Salvo em ${destPath}`);

      results[post.slug] = {
        slug: post.slug,
        localPath: `/images/posts/${post.slug}.jpg`,
        generatedQuery: query,
        unsplashId: photo.id,
        unsplashUrl: photo.links.html,
        photographer: photo.user.name,
        photographerUsername: photo.user.username,
        photographerProfile: photo.user.links.html,
        description: photo.description || photo.alt_description || '',
        fetchedAt: new Date().toISOString(),
      };

      downloaded++;

      // Respeitar rate limit Unsplash (50 req/h free)
      if (downloaded < posts.length) await sleep(2500);

    } catch (err) {
      console.error(`   ❌ Erro ao processar "${post.slug}": ${err.message}`);
      failed++;

      if (err.message.includes('403') || err.message.includes('429')) {
        console.warn('   ⏳ Rate limit detectado. Aguardando 60s...');
        await sleep(60000);
      }
    }
  }

  writeFileSync(INDEX_FILE, JSON.stringify(results, null, 2));
  console.log(`\n📝 Índice salvo em ${INDEX_FILE}`);

  console.log('\n=== Relatório Final ===');
  console.log(`✅ Baixadas: ${downloaded}`);
  console.log(`⏭️  Puladas:  ${skipped}`);
  console.log(`❌ Falhas:   ${failed}`);
  console.log(`📦 Total:    ${posts.length}`);
}

main().catch(err => {
  console.error('❌ Erro fatal:', err);
  process.exit(1);
});
