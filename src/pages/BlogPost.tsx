import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { getPost, posts } from "@/data/posts";

const CHECKOUT_URL = "https://pay.kiwify.com.br/9h8nNa3";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title={`${post.title} | Manual do Insight à Ação`}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          inLanguage: "pt-BR",
          articleSection: post.category,
          mainEntityOfPage: `/blog/${post.slug}`,
          author: { "@type": "Organization", name: "Manual do Insight à Ação" },
          publisher: { "@type": "Organization", name: "Manual do Insight à Ação" },
        }}
      />
      <SiteHeader />

      <main>
        <article className="pt-32 pb-16 md:pt-40">
          <header className="max-w-3xl mx-auto px-6 lg:px-12 mb-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-accent hover:gap-3 transition-all mb-8">
              <ArrowLeft className="h-4 w-4" /> Voltar para o blog
            </Link>
            <span className="block text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-4">{post.category}</span>
            <h1 className="font-serif text-4xl md:text-5xl leading-[1.1] text-balance mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-5 text-xs text-foreground/50">
              <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{formatDate(post.date)}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readingTime} de leitura</span>
            </div>
            <div className="gold-divider mt-10" />
          </header>

          <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-6">
            {post.content.map((block, i) =>
              block.startsWith("## ") ? (
                <h2 key={i} className="font-serif text-2xl md:text-3xl text-accent pt-6">{block.replace("## ", "")}</h2>
              ) : (
                <p key={i} className="text-base md:text-lg text-foreground/80 leading-relaxed">{block}</p>
              ),
            )}
          </div>

          <aside className="max-w-3xl mx-auto px-6 lg:px-12 mt-16">
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

        <section className="py-16 border-t border-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <h2 className="font-serif text-3xl mb-8">Continue lendo</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-accent/50"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">{p.category}</span>
                  <h3 className="font-serif text-xl mt-3 leading-snug">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default BlogPost;
