import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/posts";

const SITE_URL = "https://manualdoinsightaacao.com.br";
const CHECKOUT_URL = "https://pay.kiwify.com.br/9h8nNa3";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

const categories = ["Todos", ...Array.from(new Set(posts.map((p) => p.category)))];

/** Retorna o caminho da imagem Unsplash gerada pelo workflow, com fallback para gradiente */
const postImage = (slug: string) => `/images/posts/${slug}.jpg`;

const Blog = () => {
  const [active, setActive] = useState("Todos");

  const filtered = active === "Todos" ? posts : posts.filter((p) => p.category === active);
  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Blog sobre motivação, clareza e execução | Manual do Insight à Ação"
        description="Artigos práticos sobre motivação, disciplina, clareza mental e produtividade para sair da paralisia e transformar ideias em ação constante."
        path="/blog"
        keywords="motivação, produtividade, clareza mental, disciplina, execução, hábitos, foco"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE_URL}/blog`,
          name: "Blog Manual do Insight à Ação",
          description: "Artigos sobre motivação, clareza mental, disciplina e execução.",
          url: `${SITE_URL}/blog`,
          inLanguage: "pt-BR",
          publisher: {
            "@type": "Organization",
            name: "Manual do Insight à Ação",
            url: SITE_URL,
          },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            "@id": `${SITE_URL}/blog/${p.slug}`,
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            url: `${SITE_URL}/blog/${p.slug}`,
            inLanguage: "pt-BR",
            author: { "@type": "Organization", name: "Manual do Insight à Ação" },
          })),
        }}
      />
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-hero pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-terracotta/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center animate-fade-up">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-accent font-semibold">Blog</span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] text-balance mb-6">
            Motivação com método,{" "}
            <span className="italic text-accent">não com discurso vazio</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Conteúdos práticos sobre clareza mental, disciplina, foco e execução para quem quer sair da paralisia e agir todos os dias.
          </p>
        </div>
      </section>

      <main>
        {/* Filtro por categoria */}
        <section className="border-b border-border sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none" role="tablist" aria-label="Filtrar por categoria">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active === cat}
                  onClick={() => setActive(cat)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    active === cat
                      ? "bg-accent text-background"
                      : "text-foreground/60 hover:text-foreground border border-border hover:border-accent/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-12">

            {/* Post em destaque */}
            {featured && (
              <article className="group rounded-2xl border border-border bg-card shadow-soft overflow-hidden transition-all duration-300 hover:border-accent/50 hover:-translate-y-0.5">
                <Link to={`/blog/${featured.slug}`} className="md:grid md:grid-cols-5 block">
                  {/* Imagem de capa */}
                  <div className="md:col-span-2 relative overflow-hidden min-h-[220px] md:min-h-full bg-gradient-to-br from-accent/10 to-accent/5">
                    <img
                      src={postImage(featured.slug)}
                      alt={featured.title}
                      width={600}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const t = e.currentTarget;
                        t.style.display = "none";
                        const parent = t.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="font-serif text-6xl md:text-7xl text-accent/20 select-none leading-none flex items-center justify-center w-full h-full">${featured.title.charAt(0)}</span>`;
                        }
                      }}
                    />
                  </div>
                  {/* Conteúdo */}
                  <div className="md:col-span-3 p-7 md:p-10 flex flex-col justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">{featured.category}</span>
                        <span className="text-xs text-foreground/30 uppercase tracking-widest font-medium px-2 py-0.5 rounded-full border border-border">Destaque</span>
                      </div>
                      <h2 className="font-serif text-2xl md:text-3xl leading-snug mb-3 group-hover:text-accent transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{featured.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-xs text-foreground/50">
                        <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{formatDate(featured.date)}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readingTime}</span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                        Ler artigo <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            )}

            {/* Grid dos demais posts */}
            {rest.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <article
                    key={post.slug}
                    className="group flex flex-col rounded-2xl border border-border bg-card shadow-soft overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden h-44 bg-gradient-to-br from-accent/10 to-accent/5 flex-shrink-0">
                      <img
                        src={postImage(post.slug)}
                        alt={post.title}
                        width={600}
                        height={300}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    </div>
                    <div className="p-7 flex flex-col flex-1">
                      <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">{post.category}</span>
                      <h2 className="font-serif text-xl leading-snug mb-3">
                        <Link to={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{post.description}</p>
                      <div className="flex items-center gap-4 text-xs text-foreground/50 mb-5">
                        <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{formatDate(post.date)}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readingTime}</span>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all"
                        aria-label={`Ler artigo: ${post.title}`}
                      >
                        Ler artigo <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-24 text-muted-foreground">
                <p className="text-lg">Nenhum artigo nessa categoria ainda.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <div className="gold-divider mb-10" />
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Pronto para sair da leitura <span className="italic text-accent">e entrar em ação?</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              O Manual do Insight à Ação reúne o método completo — do insight ao próximo passo — por R$&nbsp;19,97.
            </p>
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-cta text-primary-foreground font-bold rounded-full px-10 py-6 text-base shadow-cta hover:opacity-95">
                Quero meu acesso agora
              </Button>
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Blog;
