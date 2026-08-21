import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const CHECKOUT_URL = "https://pay.kiwify.com.br/9h8nNa3";

const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.86-2.49v-3.1a5.67 5.67 0 1 0 4.95 5.62V9.01a7.35 7.35 0 0 0 4.28 1.38v-3.1a4.28 4.28 0 0 1-3.22-1.47Z" />
  </svg>
);

const XIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64Z" />
  </svg>
);

const FacebookIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
  </svg>
);

const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "TikTok", href: "https://tiktok.com", Icon: TikTokIcon },
  { label: "X (Twitter)", href: "https://x.com", Icon: XIcon },
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
];

const SiteFooter = () => (
  <footer className="bg-bordeaux-deep border-t border-border">
    <div className="max-w-6xl mx-auto px-6 lg:px-12 py-14">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl text-foreground mb-3">
            Manual do <span className="italic text-accent">Insight à Ação</span>
          </p>
          <p className="text-sm text-foreground/60 leading-relaxed max-w-xs">
            Clareza para decidir, método para executar e constância para transformar ideias em resultados reais.
          </p>
        </div>

        <nav aria-label="Links do rodapé">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">Navegação</p>
          <ul className="space-y-2 text-sm text-foreground/60">
            <li><Link to="/" className="hover:text-accent transition-colors">Início</Link></li>
            <li><Link to="/#beneficios" className="hover:text-accent transition-colors">Benefícios</Link></li>
            <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
            <li><Link to="/#faq" className="hover:text-accent transition-colors">Perguntas frequentes</Link></li>
            <li>
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                Comprar o manual
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">Siga nas redes</p>
          <ul className="flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground/70 hover:text-accent hover:border-accent transition-all hover:-translate-y-0.5"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="gold-divider my-10" />

      <p className="text-xs text-foreground/50 text-center">
        © {new Date().getFullYear()} Manual do Insight à Ação. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default SiteFooter;
