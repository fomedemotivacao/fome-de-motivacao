import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { getPost, posts } from "@/data/posts";

const SITE_URL = "https://fomedemotivacao.com.br";
const CHECKOUT_URL = "https://pay.kiwify.com.br/9h8nNa3";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

/** URL da imagem: usa Unsplash (post.image) quando disponível, senão path local */
const resolveCover = (slug: string, image?: string) =>
  image && image.startsWith("http") ? image : `/images/posts/${slug}.jpg`;

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const effectiveModified = post.modifiedDate ?? post.date;
  const coverImage = resolveCover(post.slug, post.image);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title={`${post.title} | Fome de Motivação`}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
        modifiedTime={effectiveModified}
        keywords={[
          post.category.toLowerCase(),
          ...post.tags,
          "motivação",
          "produtividade",
          "clareza mental",
        ].join(", ")}
        tags={post.tags}
        section={post.category}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${SITE_URL}/blog`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: postUrl,
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": postUrl,
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: effectiveModified,
            inLanguage: "pt-BR",
            url: postUrl,
            articleSection: post.category,
            keywords: post.tags.join(", "),
            ...(post.wordCount ? { wordCount: post.wordCount } : {}),
            image: {
              "@type": "ImageObject",
              url: coverImage,
              width: 1200,
              height: 630,
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": postUrl,
            },
            author: {
              "@type": "Organization",
              name: "Fome de Motivação",
              url: SITE_URL,
            },
            publisher: {
              "@type": "Organization",
              name: "Fome de Motivação",
              url: SITE_URL,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/og-image.jpg`,
                width: 1200,
                height: 630,
              },
            },
            isPartOf: {
              "@type": "Blog",
              "@id": `${SITE_URL}/blog`,
            },
          },
        ] as unknown as Record<string, unknown>}
      />
      <SiteHeader />

      <main>
        <article className="pt-32 pb-16 md:pt-40">
          <header className="max-w-3xl mx-auto px-6 lg:px-12 mb-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-accent hover:gap-3 transition-all mb-8">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar para o blog
            </Link>
            <span className="block text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-4">{post.category}</span>
            <h1 className="font-serif text-4xl md:text-5xl leading-[1.1] text-balance mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-5 text-xs text-foreground/50">
              <time dateTime={post.date} className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />{formatDate(post.date)}
              </time>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />{post.readingTime} de leitura
              </span>
            </div>
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5" aria-label="Tags do artigo">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="gold-divider mt-10" />
          </header>

          {/* Imagem de capa do post */}
          <div className="max-w-3xl mx-auto px-6 lg:px-12 mb-10">
            <div className="rounded-2xl overflow-hidden aspect-[1200/630] bg-gradient-to-br from-accent/10 to-accent/5">
              <img
                src={coverImage}
                alt={`Imagem de capa: ${post.title}`}
                width={1200}
                height={630}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            {/* Crédito da imagem Unsplash */}
            {post.imageCredit && (
              <p className="mt-2 text-xs text-muted-foreground text-right">
                Foto por{" "}
                <a
                  href={post.imageCredit.authorLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-accent transition-colors"
                >
                  {post.imageCredit.author}
                </a>{" "}
                no{" "}
                <a
                  href={post.imageCredit.unsplashLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-accent transition-colors"
                >
                  Unsplash
                </a>
              </p>
            )}
          </div>

          <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-6">
            {post.content.map((block, i) =>
              block.startsWith("## ") ? (
                <h2 key={i} className="font-serif text-2xl md:text-3xl text-accent pt-6">{block.replace("## ", "")}</h2>
              ) : (
                <p key={i} className="text-base md:text-lg text-foreground/80 leading-relaxed">{block}</p>
              ),
            )}
          </div>

          <aside className="max-w-3xl mx-auto px-6 lg:px-12 mt-16" aria-label="Oferta do manual">
            <div className="rounded-2xl border border-accent/30 bg-card p-8 text-center shadow-elegant">
              <h2 className="font-serif text-2xl md:text-3xl mb-3">Quer aplicar isso com um método completo?</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                O Manual do Insight à Ação reúne o passo a passo para transformar clareza em execução diária. Acesso imediato por R$ 19,97.
              </p>
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-cta text-primary-foreground font-bold rounded-full px-8 py-6 text-base shadow-cta hover:opacity-95">
                  Quero meu acesso agora
                </Button>
              </a>
            </div>
          </aside>
        </article>

        <nav aria-label="Artigos relacionados" className="py-16 border-t border-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <h2 className="font-serif text-3xl mb-8">Continue lendo</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group rounded-2xl border border-border bg-card shadow-soft overflow-hidden transition-all hover:-translate-y-1 hover:border-accent/50"
                >
                  <div className="relative overflow-hidden h-36 bg-gradient-to-br from-accent/10 to-accent/5">
                    <img
                      src={resolveCover(p.slug, p.image)}
                      alt={p.title}
                      width={600}
                      height={300}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">{p.category}</span>
                    <h3 className="font-serif text-xl mt-3 leading-snug">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </main>

      <SiteFooter />
    </div>
  );
};

export default BlogPost;
