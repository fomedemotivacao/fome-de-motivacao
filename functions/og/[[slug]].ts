/**
 * Cloudflare Pages Function — OG Image dinâmica por post
 * Rota: /og/:slug  (ex: /og/paralisia-por-analise-como-sair)
 *
 * Retorna um SVG inline como image/svg+xml (1200×630).
 * Crawlers do WhatsApp, Twitter/X, Facebook e LinkedIn aceitam SVG como og:image.
 * Para máxima compatibilidade, o Seo.tsx aponta para esta URL.
 */

const POSTS: Record<string, { title: string; category: string; description: string }> = {
  "paralisia-por-analise-como-sair": {
    title: "Paralisia por análise",
    category: "Produtividade",
    description: "Por que pensar demais impede a ação",
  },
  "motivacao-sistemas-disciplina": {
    title: "Motivação oscila.",
    category: "Mentalidade",
    description: "Sistemas sustentam. A diferença que define os resultados.",
  },
  "clareza-mental-rotina-e-decisoes": {
    title: "Clareza mental não é um dom.",
    category: "Clareza",
    description: "É uma prática que pode ser construída.",
  },
  "por-que-boas-ideias-morrem": {
    title: "Por que boas ideias morrem",
    category: "Execução",
    description: "O caminho entre o insight e a execução.",
  },
  "disciplina-nos-dias-ruins": {
    title: "Disciplina nos dias ruins",
    category: "Mentalidade",
    description: "O que a consistência real parece de perto.",
  },
  "metas-comportamento-e-revisao": {
    title: "Metas que funcionam",
    category: "Produtividade",
    description: "O objetivo não é o problema, o comportamento é.",
  },
};

/** Quebra texto em linhas de no máximo `maxChars` caracteres */
function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

function buildSvg(title: string, category: string, description: string): string {
  const titleLines = wrapText(title, 26);
  const descLines = wrapText(description, 52);

  const titleSvg = titleLines
    .map(
      (line, i) =>
        `<text x="80" y="${310 + i * 72}" font-family="Georgia,'Times New Roman',serif" font-size="64" font-weight="700" fill="#f5f0e8">${line}</text>`
    )
    .join("\n  ");

  const descSvg = descLines
    .map(
      (line, i) =>
        `<text x="80" y="${310 + titleLines.length * 72 + 30 + i * 38}" font-family="Arial,Helvetica,sans-serif" font-size="30" fill="#b8a98a">${line}</text>`
    )
    .join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f0e0c"/>
      <stop offset="100%" stop-color="#1c1a14"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#c9a84c"/>
      <stop offset="100%" stop-color="#e8d48b"/>
    </linearGradient>
  </defs>

  <!-- Fundo -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Linha decorativa lateral esquerda -->
  <rect x="0" y="0" width="6" height="630" fill="url(#accent)"/>

  <!-- Linha decorativa topo -->
  <rect x="80" y="80" width="120" height="3" fill="url(#accent)"/>

  <!-- Categoria -->
  <text x="80" y="130" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="600" letter-spacing="4" fill="#c9a84c" text-transform="uppercase">${category.toUpperCase()}</text>

  <!-- Título -->
  ${titleSvg}

  <!-- Descrição -->
  ${descSvg}

  <!-- Logotipo bottom-right -->
  <text x="1120" y="580" font-family="Georgia,'Times New Roman',serif" font-size="20" fill="#4a4535" text-anchor="end">Fome de Motivação</text>
  <rect x="1120" y="560" width="80" height="1" fill="#4a4535" x="1040"/>

  <!-- Marca d'água sutil -->
  <text x="80" y="590" font-family="Arial,Helvetica,sans-serif" font-size="18" fill="#3a3526">manualdoinsightaacao.com.br</text>
</svg>`;
}

export async function onRequest(context: { params: { slug?: string[] } }): Promise<Response> {
  const slug = (context.params.slug ?? []).join("/");
  const post = POSTS[slug];

  const { title, category, description } = post ?? {
    title: "Fome de Motivação",
    category: "Blog",
    description: "Insights que viram ação.",
  };

  const svg = buildSvg(title, category, description);

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
