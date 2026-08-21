import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Seo from "@/components/Seo";
import { posts } from "@/data/posts";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

const Blog = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Seo
      title="Blog sobre motivação, clareza e execução | Manual do Insight à Ação"
      description="Artigos práticos sobre motivação, disciplina, clareza mental e produtividade para sair da paralisia e transformar ideias em ação constante."
      path="/blog"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Blog Manual do Insight à Ação",
        description: "Artigos sobre motivação, clareza mental, disciplina e execução.",
        inLanguage: "pt-BR",
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          url: `/blog/${p.slug}`,
        })),
      }}
    />
    <SiteHeader />

    <main>
      <section className="bg-gradient-hero pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-terracotta/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center animate-fade-up">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-accent font-semibold">Blog</span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] text-balance mb-6">
            Motivação com método, <span className="italic text-accent">não com discurso vazio</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Conteúdos práticos sobre clareza mental, disciplina, foco e execução para quem quer sair da paralisia e agir todos os dias.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">{post.category}</span>
              <h2 className="font-serif text-2xl leading-snug mb-3">
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
              >
                Ler artigo <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
);

export default Blog;
