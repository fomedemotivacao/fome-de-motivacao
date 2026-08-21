# Cloudflare Pages Function — OG Image Generator

Esta função gera dinamicamente imagens Open Graph para cada artigo do site **Manual do Insight à Ação**, buscando fotos relevantes no [Unsplash](https://unsplash.com).

## Rota

```
GET /og/:slug
```

Exemplo: `https://manualdoinsightaacao.com.br/og/paralisia-por-analise-como-sair`

## Fluxo

1. Recebe o `slug` do post
2. Consulta o mapa interno `POST_META` para obter categoria e tags
3. Monta uma query em inglês baseada na categoria do post
4. Chama a API Unsplash (`/photos/random`) buscando uma foto landscape relevante
5. Retorna redirect `302` para a URL da imagem com crop `1200×630`
6. Cache de 7 dias no CDN da Cloudflare

## Variáveis de Ambiente

Configurar em **Cloudflare Pages → Settings → Environment Variables**:

| Variável           | Descrição                                           |
|--------------------|-----------------------------------------------------|
| `UNSPLASH_API_KEY` | Access Key do app Unsplash (https://unsplash.com/developers) |

## Adicionando novos posts

Ao criar um novo post em `src/data/posts.ts` com `image: "/og/<slug>"`, adicione a entrada correspondente no objeto `POST_META` dentro de `functions/og/[slug].ts`:

```ts
"meu-novo-slug": {
  title: "Título do post",
  description: "Descrição curta.",
  category: "Produtividade",  // ou Mentalidade, Clareza, Execução...
  tags: ["tag-principal", "segunda-tag"],
},
```

## Atribuição Unsplash

A função registra o download via `POST /photos/:id/download` conforme exigido pelos [Termos de Uso da API Unsplash](https://unsplash.com/api-terms). Os headers `X-Unsplash-Author` e `X-Unsplash-Profile` são retornados para rastreabilidade.
