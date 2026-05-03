import { ArrowRight, Check, ChevronDown, X, Brain, Compass, Target, Zap, Repeat, Sparkles, BookOpen, Layers, Map, Rocket, Lock, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import cover from "@/assets/manual-cover.jpg";

const CHECKOUT_URL = "https://pay.kiwify.com.br/9h8nNa3";

const CTAButton = ({ children = "Quero acessar agora", className = "", size = "lg" as "lg" | "default" }) => (
  <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
    <Button
      size={size}
      className={`bg-gradient-cta hover:opacity-95 text-primary-foreground font-semibold tracking-wide shadow-cta hover:shadow-elegant transition-all duration-300 hover:-translate-y-0.5 rounded-full px-8 py-6 text-base md:text-lg ${className}`}
    >
      {children}
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  </a>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-3 mb-6">
    <span className="h-px w-8 bg-gold" />
    <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-secondary font-medium">{children}</span>
    <span className="h-px w-8 bg-gold" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ============ HERO ============ */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <SectionLabel>Manual do Insight à Ação</SectionLabel>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-balance mb-6">
                Você não precisa de mais um <em className="text-accent not-italic">insight</em>.
                <br />Você precisa <span className="italic">agir</span> sobre o que já sabe.
              </h1>
              <p className="text-lg md:text-xl text-cream/80 mb-8 leading-relaxed max-w-xl">
                Um guia direto para quem vive cheio de ideias, metas e clareza, mas trava na hora de executar. Termina o dia com a sensação de potencial desperdiçado.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-10">
                <CTAButton />
                <a href="#dor" className="inline-flex items-center gap-2 text-cream/90 hover:text-accent transition-colors font-medium">
                  Ver como funciona <ChevronDown className="h-4 w-4 animate-bounce" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-cream/70">
                <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-accent" /> Acesso imediato</div>
                <div className="flex items-center gap-2"><Lock className="h-4 w-4 text-accent" /> Compra 100% segura</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> Leia hoje, aplique amanhã</div>
              </div>

              <div className="mt-10 inline-flex items-baseline gap-3 px-6 py-4 rounded-2xl bg-cream/10 backdrop-blur border border-cream/15">
                <span className="text-sm uppercase tracking-widest text-cream/60">Por apenas</span>
                <span className="font-serif text-4xl md:text-5xl text-accent">R$ 19,97</span>
                <span className="text-sm text-cream/60">à vista</span>
              </div>
            </div>

            <div className="relative animate-fade-in lg:justify-self-end">
              <div className="absolute -inset-10 bg-gradient-to-tr from-terracotta/40 to-transparent blur-3xl rounded-full" />
              <img
                src={cover}
                alt="Capa do livro digital Manual do Insight à Ação"
                className="relative w-full max-w-md mx-auto rounded-lg shadow-elegant rotate-[-2deg] hover:rotate-0 transition-transform duration-700"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ DOR ============ */}
      <section id="dor" className="py-24 md:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <SectionLabel>Talvez você se reconheça aqui</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-balance mb-8">
            Você sabe exatamente o que precisa fazer.
            <span className="block text-secondary italic">Mas, de novo, não fez.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance mb-12">
            Você consome conteúdo bom. Faz anotações. Tem ideias que poderiam mudar o seu ano. Sente, por dentro, que existe uma versão sua muito maior esperando para sair. Mas a semana passa, o mês passa. E a vida continua igual.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {[
              "Você começa, empolga, e abandona.",
              "Tem clareza do problema, mas não da próxima ação.",
              "Termina o dia exausto sem saber o que avançou.",
              "Sente culpa por não estar entregando o que poderia.",
            ].map((t) => (
              <div key={t} className="flex items-start gap-3 p-5 rounded-xl bg-muted/40 border border-border">
                <X className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <p className="text-foreground/85">{t}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-xl md:text-2xl font-serif italic text-primary text-balance">
            O problema nunca foi falta de informação. Foi falta de um caminho para atravessá-la.
          </p>
        </div>
      </section>

      {/* ============ POR QUE TRAVADO ============ */}
      <section className="py-24 md:py-32 bg-gradient-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel>A verdade que ninguém te conta</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-balance max-w-3xl mx-auto">
              Você não está travado por falta de capacidade.
              <span className="block text-secondary mt-2">Está travado por <em>excesso</em>.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Layers, t: "Excesso de ruído", d: "Mil estímulos, vozes e prioridades disputando sua atenção ao mesmo tempo." },
              { icon: Brain, t: "Mente desorganizada", d: "Tudo é importante, tudo é urgente. E nada termina." },
              { icon: Compass, t: "Falta de direção prática", d: "Você sabe o destino, mas não sabe qual passo dar agora." },
              { icon: Map, t: "Ausência de método", d: "Sem um sistema repetível, cada dia vira improviso e desgaste." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-card rounded-2xl p-7 shadow-soft border border-border hover:shadow-elegant transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-2xl mb-2 text-primary">{t}</h3>
                <p className="text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <p className="mt-16 text-center text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto text-balance">
            Quando o ruído some e o caminho aparece, a ação deixa de ser uma luta. Vira consequência natural de uma mente em ordem.
          </p>
        </div>
      </section>

      {/* ============ BENEFÍCIOS ============ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel>O que muda em você</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-balance max-w-3xl mx-auto leading-tight">
              De mente cheia e dia perdido para <span className="italic text-secondary">clareza, foco e movimento.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, t: "Clareza mental", d: "Saiba, sem ruído, o que importa de verdade hoje." },
              { icon: Compass, t: "Direção", d: "Pare de viver no improviso. Tenha um norte concreto." },
              { icon: Target, t: "Mais foco", d: "Faça menos coisas, melhor. Termine o que começa." },
              { icon: Zap, t: "Menos procrastinação", d: "Quebre o ciclo de adiar o que é importante para você." },
              { icon: Repeat, t: "Mais constância", d: "Construa progresso real, mesmo em semanas difíceis." },
              { icon: Rocket, t: "Insight em resultado", d: "Transforme aprendizado em ação aplicada na vida real." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="group p-7 rounded-2xl border border-border hover:border-secondary/40 bg-card hover:bg-cream-deep/40 transition-all duration-500">
                <Icon className="h-8 w-8 text-secondary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-2xl text-primary mb-2">{t}</h3>
                <p className="text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <CTAButton>Quero essa transformação</CTAButton>
          </div>
        </div>
      </section>

      {/* ============ O QUE VOCÊ VAI ENCONTRAR ============ */}
      <section className="py-24 md:py-32 bg-gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel>Dentro do manual</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-balance max-w-3xl mx-auto leading-tight">
              Um caminho prático, do <em className="text-accent not-italic">pensar</em> ao <em className="text-accent not-italic">fazer</em>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { n: "01", t: "Entendimento dos bloqueios", d: "Por que você trava, e como reconhecer o padrão antes que ele te paralise de novo." },
              { n: "02", t: "Reorganização da mente e das prioridades", d: "Tire o peso da cabeça. Coloque cada coisa no seu lugar, incluindo o que precisa sair." },
              { n: "03", t: "Da percepção ao plano", d: "Pegue o insight solto e transforme-o em um plano simples, claro e executável." },
              { n: "04", t: "Construção de ação repetível", d: "Crie um sistema mínimo que funciona até nos seus piores dias." },
              { n: "05", t: "Aplicação prática na rotina", d: "Encaixe a execução na vida real, sem virar mais um projeto que você abandona." },
              { n: "06", t: "Constância sem esforço sobre-humano", d: "Aprenda a manter o ritmo quando a motivação inevitavelmente cai." },
            ].map(({ n, t, d }) => (
              <div key={n} className="flex gap-5 p-6 rounded-2xl bg-cream/[0.06] border border-cream/10 backdrop-blur hover:bg-cream/[0.1] transition-colors">
                <span className="font-serif text-3xl text-accent flex-shrink-0">{n}</span>
                <div>
                  <h3 className="font-serif text-2xl mb-2">{t}</h3>
                  <p className="text-cream/75 leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRANSFORMAÇÃO antes/depois ============ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel>Antes e depois</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-balance max-w-3xl mx-auto leading-tight">
              A diferença entre <span className="italic text-secondary">recomeçar</span> toda semana e <span className="italic text-primary">avançar</span> todo dia.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 md:p-10 rounded-3xl bg-muted/40 border border-border">
              <h3 className="font-serif text-3xl mb-6 text-foreground/70">Antes</h3>
              <ul className="space-y-4">
                {[
                  "Mente confusa, mil abas abertas",
                  "Culpa por não dar conta",
                  "Frustração com o próprio ritmo",
                  "Recomeços toda segunda-feira",
                  "Sensação de estar correndo no lugar",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-foreground/70">
                    <X className="h-5 w-5 mt-0.5 flex-shrink-0 text-secondary" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 md:p-10 rounded-3xl bg-gradient-hero text-primary-foreground shadow-elegant">
              <h3 className="font-serif text-3xl mb-6 text-accent">Depois</h3>
              <ul className="space-y-4">
                {[
                  "Clareza sobre o próximo passo",
                  "Firmeza para decidir e executar",
                  "Ação alinhada com o que importa",
                  "Leveza no lugar da pressão constante",
                  "Direção visível, dia após dia",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-accent" />
                    <span className="text-cream/95">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VALOR ============ */}
      <section className="py-24 md:py-32 bg-gradient-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <SectionLabel>Quanto custa não mudar?</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-balance mb-8">
            R$ 19,97 é mais barato do que <span className="italic text-secondary">mais um ano</span> travado no mesmo lugar.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance mb-6">
            Pense em quanto você já gastou em cursos que não terminou, agendas que abandonou e métodos que não aplicou.
          </p>
          <p className="text-lg md:text-xl text-foreground/85 leading-relaxed text-balance">
            O custo real não está no preço deste manual. Está em chegar no fim do ano, de novo, sentindo que ele passou sem você.
          </p>
        </div>
      </section>

      {/* ============ OFERTA ============ */}
      <section id="oferta" className="py-24 md:py-32 bg-background">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="rounded-[2rem] bg-gradient-hero text-primary-foreground p-8 md:p-16 shadow-elegant relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-terracotta/40 blur-3xl rounded-full" />
            <div className="relative grid md:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <SectionLabel>Sua oferta de hoje</SectionLabel>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-balance mb-4">
                  Manual do Insight à Ação
                </h2>
                <p className="text-cream/80 text-lg mb-8 max-w-lg">
                  Um guia prático para tomar decisões com propósito e gerar impacto real, em qualquer rotina.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Acesso imediato após a compra",
                    "Leitura objetiva, sem enrolação",
                    "Aplicação simples e repetível na sua rotina",
                    "Pagamento único, sem assinatura",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-3 text-cream/90">
                      <Check className="h-5 w-5 text-accent flex-shrink-0" /> {t}
                    </li>
                  ))}
                </ul>

                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-cream/60 text-sm uppercase tracking-widest">Por apenas</span>
                  <span className="font-serif text-6xl md:text-7xl text-accent leading-none">R$ 19,97</span>
                </div>

                <CTAButton>Quero acessar agora</CTAButton>

                <p className="mt-5 text-sm text-cream/60 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Pagamento processado com segurança via Kiwify.
                </p>
              </div>

              <div className="hidden md:block">
                <img src={cover} alt="Manual do Insight à Ação" className="w-64 rounded-md shadow-elegant rotate-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-24 md:py-32 bg-gradient-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <SectionLabel>Perguntas frequentes</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl text-balance leading-tight">
              Tire suas dúvidas antes de começar.
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: "Isso é para mim?", a: "Se você sente que tem potencial, ideias e clareza, mas não consegue colocar em prática de forma constante, sim, foi feito para você. Não importa sua área, sua idade ou o tamanho do projeto." },
              { q: "Funciona se eu estiver travado há muito tempo?", a: "Sim. O manual existe justamente para quem já tentou começar várias vezes. O foco é destravar o ciclo, não exigir que você se torne uma pessoa diferente." },
              { q: "É prático ou teórico?", a: "Direto e prático. Cada parte termina com algo que você consegue aplicar imediatamente, sem precisar parar tudo e reorganizar a vida inteira." },
              { q: "Vou conseguir aplicar com rotina corrida?", a: "Foi pensado exatamente para isso. A proposta é uma execução simples e repetível, não um sistema que exige horas livres que você não tem." },
              { q: "Como recebo o acesso?", a: "Assim que o pagamento é confirmado, o acesso é liberado imediatamente no seu e-mail. É só abrir e começar." },
              { q: "É um pagamento único?", a: "Sim. Você paga R$ 19,97 uma única vez e tem acesso ao material. Sem mensalidade, sem cobrança recorrente." },
            ].map(({ q, a }, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-xl px-6 shadow-soft">
                <AccordionTrigger className="font-serif text-lg md:text-xl text-primary hover:no-underline text-left py-5">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-base">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="py-24 md:py-36 bg-gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <BookOpen className="h-12 w-12 text-accent mx-auto mb-6" />
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-balance mb-8">
            Daqui a um ano, você vai querer ter começado <span className="italic text-accent">hoje</span>.
          </h2>
          <p className="text-lg md:text-xl text-cream/85 leading-relaxed text-balance mb-10 max-w-2xl mx-auto">
            Você já sabe o que precisa fazer. O Manual do Insight à Ação é a ponte entre saber e fazer. E ela começa no momento em que você decide atravessar.
          </p>
          <CTAButton>Começar agora por R$ 19,97</CTAButton>
          <p className="mt-6 text-sm text-cream/60">Acesso imediato • Pagamento único • Compra segura</p>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-bordeaux-deep text-cream/60 py-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="font-serif text-lg text-cream">Manual do Insight à Ação</p>
          <p>© {new Date().getFullYear()}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
