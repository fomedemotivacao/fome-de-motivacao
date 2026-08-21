import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHECKOUT_URL = "https://pay.kiwify.com.br/9h8nNa3";

const links = [
  { label: "Início", to: "/", hash: "" },
  { label: "O Manual", to: "/", hash: "#dor" },
  { label: "Benefícios", to: "/", hash: "#beneficios" },
  { label: "Depoimentos", to: "/", hash: "#depoimentos" },
  { label: "Blog", to: "/blog", hash: "" },
  { label: "FAQ", to: "/", hash: "#faq" },
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const navLinkClass = scrolled
    ? "text-sm text-foreground/70 hover:text-accent transition-colors font-medium"
    : "text-sm text-white/80 hover:text-white transition-colors font-medium";

  const logoClass = scrolled
    ? "font-serif text-lg md:text-xl text-foreground hover:text-accent transition-colors"
    : "font-serif text-lg md:text-xl text-white hover:text-white/80 transition-colors";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className="max-w-7xl mx-auto px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between"
      >
        <Link to="/" className={logoClass}>
          Manual do{" "}<span className="italic text-accent">Insight à Ação</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <Link to={`${l.to}${l.hash}`} className={navLinkClass}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-cta text-primary-foreground font-bold rounded-full px-6 shadow-cta hover:opacity-95 transition-all">
              Quero o manual
            </Button>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className={`lg:hidden p-2 -mr-2 ${scrolled ? "text-foreground" : "text-white"}`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <ul className="px-6 py-4 space-y-1">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={`${l.to}${l.hash}`}
                  className="block py-3 text-base text-foreground/80 hover:text-accent transition-colors border-b border-border/50"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-gradient-cta text-primary-foreground font-bold rounded-full py-6 shadow-cta">
                  Quero destravar minha vida agora
                </Button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
