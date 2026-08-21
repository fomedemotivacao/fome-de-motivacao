/**
 * generate-post.mjs
 * Gera um novo post para o Fome de Motivação usando a API da OpenAI
 * e faz commit direto em src/data/posts.ts via GitHub API.
 *
 * Secrets necessários no repositório:
 *   OPENAI_API_KEY       — chave da OpenAI
 *   GH_TOKEN             — GitHub token com permissão contents:write
 *
 * Variáveis de ambiente opcionais (podem ser passadas pelo workflow):
 *   POST_TEMA            — tema do artigo (ex: "disciplina")
 *   POST_ANGULO          — ângulo editorial (ex: "como a disciplina supera motivação")
 *   POST_SENSACAO        — reflexão que o leitor deve levar (ex: "clareza sobre constância")
 *   POST_PALAVRA_CHAVE   — keyword SEO (ex: "disciplina e consistência")
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import https from 'https';

// ─── Helpers ────────────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 70);
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function jsonPost(https_req_body) {
  return new Promise((resolve, reject) => {
    const url = new URL('https://api.openai.com/v1/chat/completions');
    const body = JSON.stringify(https_req_body);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Falha ao parsear resposta: ' + data)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── Lê posts.ts atual e conta artigos ──────────────────────────────────────

const postsPath = 'src/data/posts.ts';
const postsRaw = readFileSync(postsPath, 'utf-8');

// Conta quantos slugs já existem para calcular contador_artigo
const slugMatches = [...postsRaw.matchAll(/slug:\s*"([^"]+)"/g)];
const totalExistingPosts = slugMatches.length;
const contadorArtigo = totalExistingPosts + 1;
const ofereceEbook = contadorArtigo % 3 === 0;

console.log(`📊 Posts existentes: ${totalExistingPosts}`);
console.log(`📝 Novo artigo será o #${contadorArtigo} | offerEbook: ${ofereceEbook}`);

// ─── Tema e variáveis ────────────────────────────────────────────────────────

// Lista de temas de rotatividade para quando não for passado POST_TEMA
const TEMAS_BANCO = [
  { tema: 'procrastinação', angulo: 'por que adiamos o que importa e o custo real disso', sensacao: 'clareza sobre o que estamos evitando', keyword: 'procrastinação como parar de adiar' },
  { tema: 'autoconfiança', angulo: 'como ela se constrói na prática e não pelo pensamento positivo', sensacao: 'entender que confiança vem de ação, não de espera', keyword: 'como desenvolver autoconfiança' },
  { tema: 'medo do fracasso', angulo: 'por que o fracasso paralisa e como mudar a relação com ele', sensacao: 'menos medo de errar, mais disposição de tentar', keyword: 'medo de fracassar como superar' },
  { tema: 'hábitos', angulo: 'por que mudar hábitos é difícil e o que realmente funciona', sensacao: 'perspectiva realista sobre mudança de comportamento', keyword: 'como criar hábitos consistentes' },
  { tema: 'propósito', angulo: 'o mito de encontrar um propósito único e como construir sentido no dia a dia', sensacao: 'que propósito pode ser construído, não apenas descoberto', keyword: 'como encontrar propósito de vida' },
  { tema: 'comparação com outros', angulo: 'o efeito das redes sociais na autoimagem e como sair do ciclo de comparação', sensacao: 'menos competição interna, mais foco no próprio caminho', keyword: 'parar de se comparar com os outros' },
  { tema: 'resiliência', angulo: 'o que ela é de verdade além do clichê motivacional', sensacao: 'que resistir não significa ser invulnerável', keyword: 'como desenvolver resiliência' },
  { tema: 'foco', angulo: 'por que estamos cada vez mais distraídos e o que fazer com isso', sensacao: 'que foco é uma escolha que pode ser treinada', keyword: 'como melhorar o foco e concentração' },
  { tema: 'disciplina', angulo: 'por que a disciplina sustenta resultados quando a motivação some', sensacao: 'que consistência bate intensidade no longo prazo', keyword: 'disciplina e consistência para resultados' },
  { tema: 'limites pessoais', angulo: 'por que dizer não é uma forma de respeito próprio', sensacao: 'que impor limites não é egoísmo, é saúde', keyword: 'como impor limites pessoais' },
];

// Escolhe tema baseado no índice circular para variar sempre
const temaIdx = totalExistingPosts % TEMAS_BANCO.length;
const temaDefault = TEMAS_BANCO[temaIdx];

const tema = process.env.POST_TEMA || temaDefault.tema;
const angulo = process.env.POST_ANGULO || temaDefault.angulo;
const sensacao = process.env.POST_SENSACAO || temaDefault.sensacao;
const palavraChave = process.env.POST_PALAVRA_CHAVE || temaDefault.keyword;

console.log(`🎯 Tema: ${tema}`);
console.log(`📐 Ângulo: ${angulo}`);
console.log(`🔑 Palavra-chave: ${palavraChave}`);

// ─── Lê o PROMPT_MESTRE de prompt-mestre.ts ─────────────────────────────────

const promptMestreRaw = readFileSync('src/data/prompt-mestre.ts', 'utf-8');
const promptMestreMatch = promptMestreRaw.match(/export const PROMPT_MESTRE = `([\s\S]*?)`;/);
if (!promptMestreMatch) throw new Error('Não foi possível extrair PROMPT_MESTRE');
const PROMPT_MESTRE = promptMestreMatch[1];

// ─── Chama a OpenAI ──────────────────────────────────────────────────────────

console.log('⏳ Gerando artigo via OpenAI...');

const systemPrompt = PROMPT_MESTRE
  .replace('{tema_desc}', tema)
  .replace('{angulo}', angulo)
  .replace('{sensacao}', sensacao)
  .replace('{palavra_chave}', palavraChave)
  .replace('{contador_artigo}', String(contadorArtigo))
  .replace('{oferecer_ebook}', String(ofereceEbook));

const userPrompt = `
Gere agora um artigo completo seguindo todas as instruções do prompt mestre.

Variáveis para este artigo:
- tema_desc: ${tema}
- angulo: ${angulo}
- sensacao: ${sensacao}
- palavra_chave: ${palavraChave}
- contador_artigo: ${contadorArtigo}
- oferecer_ebook: ${ofereceEbook}

O artigo deve ter no mínimo 1.220 palavras.
Responda APENAS com o artigo. Primeira linha: # Título do Artigo. Segunda linha: RESUMO: [resumo até 200 caracteres].
`;

const aiResponse = await jsonPost({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ],
  max_tokens: 3500,
  temperature: 0.8,
});

if (aiResponse.error) {
  console.error('Erro OpenAI:', JSON.stringify(aiResponse.error));
  process.exit(1);
}

const rawArticle = aiResponse.choices?.[0]?.message?.content;
if (!rawArticle) {
  console.error('Resposta vazia da OpenAI');
  process.exit(1);
}

console.log('✅ Artigo gerado com sucesso!');

// ─── Extrai título, resumo e parágrafos ──────────────────────────────────────

const lines = rawArticle.split('\n');
const titleLine = lines.find(l => l.startsWith('# '))?.replace(/^#\s+/, '').trim() || `Artigo sobre ${tema}`;
const resumoLine = lines.find(l => l.startsWith('RESUMO:'))?.replace(/^RESUMO:\s*/, '').trim() || '';

// Parágrafos: tudo exceto linha de título e resumo
const contentLines = lines
  .filter(l => !l.startsWith('# ') && !l.startsWith('RESUMO:') && l.trim() !== '')
  .map(l => l.trim());

// Agrupa parágrafos (linhas com ## viram subtítulo, resto é parágrafo normal)
const paragraphs = [];
let buffer = '';
for (const line of contentLines) {
  if (line.startsWith('## ')) {
    if (buffer.trim()) { paragraphs.push(buffer.trim()); buffer = ''; }
    paragraphs.push(line); // subtítulo no formato "## Texto"
  } else {
    buffer += (buffer ? ' ' : '') + line;
    // Quebra parágrafo a cada ~300 chars de forma natural
    if (buffer.length > 300 && (buffer.endsWith('.') || buffer.endsWith('?') || buffer.endsWith('!'))) {
      paragraphs.push(buffer.trim());
      buffer = '';
    }
  }
}
if (buffer.trim()) paragraphs.push(buffer.trim());

// Estimativa de palavras e tempo de leitura
const wordCount = contentLines.join(' ').split(/\s+/).length;
const readingTime = `${Math.max(5, Math.round(wordCount / 200))} min`;

// ─── Monta o objeto Post ─────────────────────────────────────────────────────

const slug = slugify(titleLine);
const postDate = today();

// Extrai categoria a partir do tema
const categoryMap = {
  procrastinação: 'Produtividade',
  foco: 'Produtividade',
  hábitos: 'Hábitos',
  disciplina: 'Disciplina',
  autoconfiança: 'Mentalidade',
  resiliência: 'Mentalidade',
  propósito: 'Propósito',
  medo: 'Coragem',
  comparação: 'Autoconhecimento',
  limites: 'Autoconhecimento',
};
const category = Object.entries(categoryMap).find(([k]) => tema.toLowerCase().includes(k))?.[1] || 'Desenvolvimento Pessoal';

// Tags automáticas
const tags = [palavraChave, tema, 'desenvolvimento pessoal', 'mentalidade', 'autoconhecimento']
  .filter((v, i, a) => v && a.indexOf(v) === i)
  .slice(0, 5);

console.log(`📌 Slug: ${slug}`);
console.log(`📂 Categoria: ${category}`);
console.log(`📖 Palavras estimadas: ${wordCount}`);

// ─── Monta a string do novo post ────────────────────────────────────────────

const escapedParagraphs = paragraphs
  .map(p => `      ${JSON.stringify(p)}`)
  .join(',\n');

const newPostBlock = `  {
    slug: "${slug}",
    title: ${JSON.stringify(titleLine)},
    description: ${JSON.stringify(resumoLine || `Reflexões sobre ${tema} para ajudar você a pensar melhor e agir com mais clareza.`)},
    date: "${postDate}",
    readingTime: "${readingTime}",
    category: ${JSON.stringify(category)},
    tags: ${JSON.stringify(tags)},
    wordCount: ${wordCount},
    offerEbook: ${ofereceEbook},
    image: "/og/${slug}",
    content: [
${escapedParagraphs}
    ],
  }`;

// ─── Insere o novo post no início do array posts ─────────────────────────────

// Localiza o início do array posts para inserir o novo item no topo
const insertMarker = 'export const posts: Post[] = [';
const insertIdx = postsRaw.indexOf(insertMarker);
if (insertIdx === -1) throw new Error('Não encontrei "export const posts: Post[] = [" em posts.ts');

const insertPoint = insertIdx + insertMarker.length;
const before = postsRaw.slice(0, insertPoint);
const after = postsRaw.slice(insertPoint);

// Remove espaço/quebra inicial do array existente para formatar certo
const afterTrimmed = after.replace(/^\s*/, '\n  ');

const newPostsContent = before + '\n' + newPostBlock + ',\n' + afterTrimmed;

writeFileSync(postsPath, newPostsContent, 'utf-8');
console.log('💾 posts.ts atualizado com o novo artigo!');
console.log(`\n🎉 Post "${titleLine}" publicado com sucesso!`);
