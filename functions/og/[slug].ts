/**
 * Cloudflare Pages Function — Dynamic OG Image Generator
 * Route: /og/:slug
 *
 * Fluxo:
 *   1. Lê o slug da URL
 *   2. Busca metadados do post no KV (ou fallback hardcoded via posts.ts embutido)
 *   3. Busca imagem relevante no Unsplash usando a categoria/tags do post
 *   4. Renderiza HTML com sobreposição de título + marca
 *   5. Retorna redirect para a imagem Unsplash com headers de cache longos
 *
 * Variáveis de ambiente necessárias (Cloudflare Pages → Settings → Environment variables):
 *   UNSPLASH_API_KEY — sua Access Key do Unsplash (https://unsplash.com/developers)
 */

interface Env {
  UNSPLASH_API_KEY: string;
}

const SITE_NAME = "Manual do Insight à Ação";
const SITE_URL  = "https://manualdoinsightaacao.com.br";

// Mapa slug → { title, description, category, tags[] }
// Mantido em sync com src/data/posts.ts — atualizar ao adicionar posts.
const POST_META: Record<string, { title: string; description: string; category: string; tags: string[] }> = {
  "paralisia-por-analise-como-sair": {
    title: "Paralisia por análise: por que pensar demais impede a ação",
    description: "Entenda por que o excesso de análise trava decisões e como sair do ciclo.",
    category: "Produtividade",
    tags: ["paralisia por análise", "tomada de decisão", "produtividade"],
  },
  "motivacao-sistemas-disciplina": {
    title: "Motivação oscila. Sistemas sustentam.",
    description: "Como construir sistemas simples que mantêm a execução funcionando.",
    category: "Mentalidade",
    tags: ["motivação", "sistemas", "disciplina"],
  },
  "clareza-mental-rotina-e-decisoes": {
    title: "Clareza mental não é um dom. É uma prática.",
    description: "Um ritual simples de revisão diária organiza as prioridades reais.",
    category: "Clareza",
    tags: ["clareza mental", "rotina", "prioridades"],
  },
  "por-que-boas-ideias-morrem": {
    title: "Por que boas ideias morrem",
    description: "O caminho entre o insight e a execução.",
    category: "Execução",
    tags: ["insight", "execução", "ideias"],
  },
  "disciplina-nos-dias-ruins": {
    title: "Disciplina nos dias ruins",
    description: "O que a consistência real parece de perto.",
    category: "Mentalidade",
    tags: ["disciplina", "consistência", "hábitos"],
  },
  "metas-comportamento-e-revisao": {
    title: "Metas que funcionam",
    description: "Por que o objetivo não é o problema — o comportamento é.",
    category: "Produtividade",
    tags: ["metas", "objetivos", "planejamento"],
  },
};

// Palavras-chave em inglês por categoria para busca no Unsplash
const CATEGORY_KEYWORDS: Record<string, string> = {
  "Produtividade": "productivity focus work desk minimal",
  "Mentalidade": "mindset focus determination lion strength",
  "Clareza": "clarity morning light calm mind zen",
  "Execução": "action execution momentum movement",
  "Disciplina": "discipline routine consistency training",
  "Hábitos": "habits routine morning ritual",
  default: "motivation inspiration success focus",
};

function buildUnsplashQuery(meta: { category: string; tags: string[] }): string {
  const base = CATEGORY_KEYWORDS[meta.category] ?? CATEGORY_KEYWORDS["default"];
  // Pega a primeira tag em inglês aproximado (slug da tag)
  const tagSlug = meta.tags[0]?.replace(/\s+/g, "-").toLowerCase() ?? "";
  return encodeURIComponent(`${base} ${tagSlug}`.trim());
}

// Gera uma OG image como redirect para a imagem Unsplash
// (1200×630 crop) com headers de cache de 7 dias
export async function onRequest(context: {
  request: Request;
  env: Env;
  params: { slug: string };
}): Promise<Response> {
  const { slug } = context.params;
  const apiKey   = context.env.UNSPLASH_API_KEY;

  if (!apiKey) {
    return new Response("UNSPLASH_API_KEY não configurada.", { status: 500 });
  }

  const meta = POST_META[slug];

  if (!meta) {
    // Slug desconhecido — usa imagem padrão do site
    return Response.redirect(`${SITE_URL}/og-image.jpg`, 302);
  }

  const query = buildUnsplashQuery(meta);

  try {
    // Busca uma foto relevante no Unsplash (landscape, 1200×630)
    const unsplashUrl =
      `https://api.unsplash.com/photos/random` +
      `?query=${query}` +
      `&orientation=landscape` +
      `&content_filter=high` +
      `&client_id=${apiKey}`;

    const res  = await fetch(unsplashUrl, { cf: { cacheTtl: 3600 } } as RequestInit);

    if (!res.ok) {
      throw new Error(`Unsplash ${res.status}: ${await res.text()}`);
    }

    const data = (await res.json()) as {
      urls: { raw: string; full: string; regular: string };
      user: { name: string; links: { html: string } };
    };

    // URL da imagem em 1200×630 via parâmetros da API Unsplash
    const imageUrl =
      `${data.urls.raw}` +
      `&w=1200&h=630&fit=crop&crop=entropy&auto=format&q=85`;

    // Registra o download conforme exigência da API Unsplash
    // (fire-and-forget, sem await)
    fetch(
      `https://api.unsplash.com/photos/${encodeURIComponent((data as any).id)}/download` +
        `?client_id=${apiKey}`
    ).catch(() => {});

    // Retorna redirect permanente para a imagem com cache longo
    return new Response(null, {
      status: 302,
      headers: {
        Location: imageUrl,
        "Cache-Control": "public, max-age=604800, s-maxage=604800", // 7 dias
        "CDN-Cache-Control": "max-age=604800",
        "X-Unsplash-Author": data.user.name,
        "X-Unsplash-Profile": data.user.links.html,
      },
    });
  } catch (err) {
    console.error("[og/[slug]] Erro ao buscar Unsplash:", err);
    // Fallback: imagem padrão do site
    return Response.redirect(`${SITE_URL}/og-image.jpg`, 302);
  }
}
