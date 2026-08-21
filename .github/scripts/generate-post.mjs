/**
 * generate-post.mjs
 * Gera um novo post via OpenRouter (qualquer modelo) e insere em posts.ts
 * Variáveis de ambiente necessárias:
 *   OPENROUTER_API_KEY — chave da OpenRouter
 *   TEMA_INPUT        — tema opcional (vazio = gerado automaticamente)
 */

import fs from 'fs';
import path from 'path';

const POSTS_PATH = path.resolve('src/data/posts.ts');
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'openrouter/auto'; // OpenRouter escolhe automaticamente o melhor modelo disponível

// ─────────────────────────────────────────
// BANCO DE TEMAS — rotação automática
// ─────────────────────────────────────────
const TEMAS = [
  { tema: 'Medo de falhar e como ele bloqueia decisões importantes', angulo: 'Como o medo do fracasso se disfarça de precaução e cuidado', sensacao: 'Reconhecer que hesitar também tem um custo', palavra_chave: 'medo de falhar' },
  { tema: 'Procrastinação e adiamento crônico', angulo: 'A diferença entre procrastinação por preguiça e por sobrecarga emocional', sensacao: 'Entender o que está por trás do adiamento', palavra_chave: 'procrastinação' },
  { tema: 'Autoestima e autoimagem realista', angulo: 'Como a autocrítica excessiva sabota o desempenho', sensacao: 'Reconhecer padrões internos de sabotagem', palavra_chave: 'autoestima' },
  { tema: 'Foco em um mundo de distrações', angulo: 'Por que o foco profundo é uma habilidade rara e como cultivá-la', sensacao: 'Clareza sobre o que realmente merece atenção', palavra_chave: 'foco e concentração' },
  { tema: 'Gestão de energia versus gestão de tempo', angulo: 'Produtividade depende mais de energia do que de horas disponíveis', sensacao: 'Parar de culpar falta de tempo e entender falta de energia', palavra_chave: 'gestão de energia' },
  { tema: 'Resiliência diante de fracassos', angulo: 'O fracasso como dado, não como identidade', sensacao: 'Ver erros como parte natural do processo de crescimento', palavra_chave: 'resiliência' },
  { tema: 'Comparação com os outros nas redes sociais', angulo: 'Como a comparação distorce a percepção do próprio progresso', sensacao: 'Reencontrar os próprios critérios de sucesso', palavra_chave: 'comparação social' },
  { tema: 'Propósito e direção de vida', angulo: 'A diferença entre ter um objetivo e ter um motivo real para agir', sensacao: 'Reflexão sobre o que realmente importa', palavra_chave: 'propósito de vida' },
  { tema: 'Limites e dizer não', angulo: 'Por que estabelecer limites é um ato de responsabilidade, não egoísmo', sensacao: 'Clareza sobre o custo de nunca recusar demandas', palavra_chave: 'estabelecer limites' },
  { tema: 'Hábitos que sustentam resultados', angulo: 'Pequenas ações repetidas constroem mais do que grandes esforços esporádicos', sensacao: 'Valorizar a consistência discreta', palavra_chave: 'hábitos de sucesso' },
  { tema: 'Relacionamentos que drenam energia', angulo: 'Como identificar dinâmicas desgastantes sem demonizar as pessoas envolvidas', sensacao: 'Perceber padrões nas relações que consomem mais do que oferecem', palavra_chave: 'relacionamentos tóxicos' },
  { tema: 'Sobrecarga mental e burnout', angulo: 'Quando a exaustão não é preguiça mas sinal de sobrecarga real', sensacao: 'Parar de exigir de si mesmo o que o corpo e a mente já avisaram que não suportam', palavra_chave: 'burnout e esgotamento' },
  { tema: 'Gratidão como prática e não como positividade forçada', angulo: 'Gratidão honesta versus otimismo performático', sensacao: 'Reconhecer o que existe de real e positivo sem negar dificuldades', palavra_chave: 'gratidão' },
  { tema: 'Aprender com a adversidade', angulo: 'O que experiências difíceis ensinam que o conforto não consegue', sensacao: 'Encontrar sentido em momentos de dificuldade sem romantizá-los', palavra_chave: 'aprendizado pela adversidade' },
  { tema: 'Confiança em si mesmo', angulo: 'Confiança não vem de certeza mas de experiência acumulada de tentativa e retomada', sensacao: 'Compreender que confiança é construída, não herdada', palavra_chave: 'autoconfiança' },
  { tema: 'Paciência em um mundo de resultados imediatos', angulo: 'O custo da impaciência e o valor da espera estratégica', sensacao: 'Repensar a relação com o tempo e o processo', palavra_chave: 'paciência e longo prazo' },
  { tema: 'Identidade e mudança de vida', angulo: 'Como a identidade que carregamos pode impedir mudanças que queremos', sensacao: 'Perceber que mudar comportamentos exige revisar quem acreditamos ser', palavra_chave: 'mudança de identidade' },
  { tema: 'Pressão social e expectativas dos outros', angulo: 'O peso de viver para aprovação externa', sensacao: 'Identificar quando está vivendo a vida do outro e não a sua', palavra_chave: 'pressão social' },
  { tema: 'Descanso como parte do desempenho', angulo: 'Por que descansar não é perda de tempo mas parte essencial da produtividade', sensacao: 'Quebrar a culpa associada ao descanso', palavra_chave: 'importância do descanso' },
  { tema: 'Zona de conforto e crescimento real', angulo: 'Zona de conforto não é inimiga, é ponto de partida', sensacao: 'Entender que sair do conforto tem custo e benefício reais', palavra_chave: 'zona de conforto' },
];

// ─────────────────────────────────────────
// LER posts.ts e contar quantos posts existem
// ─────────────────────────────────────────
function lerPostsTs() {
  return fs.readFileSync(POSTS_PATH, 'utf8');
}

function contarPosts(conteudo) {
  const matches = conteudo.match(/slug:/g);
  return matches ? matches.length : 0;
}

function slugificar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

// ─────────────────────────────────────────
// CHAMAR OpenRouter
// ─────────────────────────────────────────
async function gerarComIA(promptSistema, promptUsuario) {
  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://fomedemotivacao.com.br',
      'X-Title': 'Fome de Motivação',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: promptSistema },
        { role: 'user',   content: promptUsuario },
      ],
      temperature: 0.85,
      max_tokens: 3500,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`OpenRouter erro ${resp.status}: ${err}`);
  }

  const json = await resp.json();
  return json.choices[0].message.content.trim();
}

// ─────────────────────────────────────────
// PARSEAR resposta da IA → objeto Post
// ─────────────────────────────────────────
function parsearResposta(texto, temaObj, contador, slug) {
  const linhas = texto.split('\n');
  let titulo = '';
  let resumo = '';
  const paragrafos = [];
  let em_corpo = false;

  for (const linha of linhas) {
    if (linha.startsWith('# ')) {
      titulo = linha.replace('# ', '').trim();
      em_corpo = true;
    } else if (linha.startsWith('RESUMO:')) {
      resumo = linha.replace('RESUMO:', '').trim().slice(0, 220);
    } else if (em_corpo && linha.trim()) {
      if (linha.startsWith('## ')) {
        paragrafos.push(`## ${linha.replace('## ', '').trim()}`);
      } else if (!linha.startsWith('#')) {
        paragrafos.push(linha.trim());
      }
    }
  }

  if (!titulo) titulo = temaObj.tema;
  if (!resumo) resumo = temaObj.tema;

  const offerEbook = contador % 3 === 0;
  const hoje = new Date().toISOString().slice(0, 10);

  return { titulo, resumo, slug, paragrafos, offerEbook, hoje, contador };
}

// ─────────────────────────────────────────
// GERAR BLOCO TypeScript do post
// ─────────────────────────────────────────
function gerarBlocoPost(p, temaObj) {
  const tags = temaObj.palavra_chave.split(' ').slice(0, 5).map(t => `"${t.toLowerCase()}"`);
  const conteudoStr = p.paragrafos
    .map(par => `      ${JSON.stringify(par)},`)
    .join('\n');

  return `  {
    slug: "${p.slug}",
    title: ${JSON.stringify(p.titulo)},
    description: ${JSON.stringify(p.resumo)},
    date: "${p.hoje}",
    readingTime: "9 min",
    category: "Mentalidade",
    tags: [${tags.join(', ')}],
    wordCount: ${p.paragrafos.join(' ').split(/\s+/).length},
    offerEbook: ${p.offerEbook},
    image: "/og/${p.slug}",
    content: [
${conteudoStr}
    ],
  },`;
}

// ─────────────────────────────────────────
// INJETAR post no posts.ts (no início do array)
// ─────────────────────────────────────────
function injetarPost(conteudoOriginal, blocoPost) {
  const marcador = 'export const posts: Post[] = [';
  const idx = conteudoOriginal.indexOf(marcador);
  if (idx === -1) throw new Error('Marcador posts[] não encontrado em posts.ts');
  const antes = conteudoOriginal.slice(0, idx + marcador.length);
  const depois = conteudoOriginal.slice(idx + marcador.length);
  return `${antes}\n${blocoPost}${depois}`;
}

// ─────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────
async function main() {
  const conteudoAtual = lerPostsTs();
  const totalPosts = contarPosts(conteudoAtual);
  const contador = totalPosts + 1;

  // Escolher tema: input manual ou rotação automática
  let temaObj;
  const temaInput = process.env.TEMA_INPUT?.trim();
  if (temaInput) {
    temaObj = { tema: temaInput, angulo: temaInput, sensacao: 'Reflexão profunda sobre o tema', palavra_chave: temaInput };
  } else {
    temaObj = TEMAS[(totalPosts) % TEMAS.length];
  }

  const slug = slugificar(temaObj.tema);

  console.log(`📝 Gerando post #${contador}: ${temaObj.tema}`);
  console.log(`📌 Slug: ${slug}`);
  console.log(`🤖 Modelo: ${MODEL}`);

  // Ler o prompt mestre diretamente do arquivo
  const promptMestreRaw = fs.readFileSync('src/data/prompt-mestre.ts', 'utf8');
  const matchPrompt = promptMestreRaw.match(/`([\s\S]+?)`/);
  const promptMestre = matchPrompt ? matchPrompt[1].trim() : 'Escreva um artigo de desenvolvimento pessoal em português do Brasil com pelo menos 1220 palavras.';

  const promptUsuario = `
Gere um artigo completo seguindo rigorosamente o PROMPT MESTRE acima.

Variáveis do artigo:
- tema_desc: ${temaObj.tema}
- angulo: ${temaObj.angulo}
- sensacao: ${temaObj.sensacao}
- palavra_chave: ${temaObj.palavra_chave}
- contador_artigo: ${contador}
- oferecer_ebook: ${contador % 3 === 0}

Formato obrigatório:
# Título do Artigo
RESUMO: [até 220 caracteres descrevendo o artigo]

[Corpo do artigo com no mínimo 1220 palavras, usando ## para subtítulos]
  `;

  const resposta = await gerarComIA(promptMestre, promptUsuario);
  console.log('✅ Resposta da IA recebida.');

  const parsed = parsearResposta(resposta, temaObj, contador, slug);
  console.log(`📰 Título: ${parsed.titulo}`);
  console.log(`📖 Parágrafos: ${parsed.paragrafos.length}`);

  const bloco = gerarBlocoPost(parsed, temaObj);
  const novoConteudo = injetarPost(conteudoAtual, bloco);

  fs.writeFileSync(POSTS_PATH, novoConteudo, 'utf8');
  console.log(`✅ posts.ts atualizado com o post #${contador}.`);
}

main().catch(err => {
  console.error('❌ Erro ao gerar post:', err);
  process.exit(1);
});
