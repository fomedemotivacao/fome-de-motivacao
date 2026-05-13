import { ArrowRight, Check, ChevronDown, X, Brain, Compass, Target, Zap, Repeat, Sparkles, BookOpen, Map, Rocket, Lock, Clock, ShieldCheck, Star, Quote, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import cover from "@/assets/manual-cover.jpg";

const CHECKOUT_URL = "https://pay.kiwify.com.br/9h8nNa3";

const CTAButton = ({ children = "Quero destravar minha vida agora", className = "", size = "lg" as "lg" | "default" }) => (
  <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
    <Button
      size={size}
      className={`bg-gradient-cta hover:opacity-95 text-primary-foreground font-bold tracking-wide shadow-cta hover:shadow-elegant transition-all duration-300 hover:-translate-y-0.5 rounded-full px-8 py-7 text-base md:text-lg ${className}`}
    >
      {children}
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  </a>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-3 mb-6">
    <span className="h-px w-8 bg-gold" />
    <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-accent font-semibold">{children}</span>
    <span className="h-px w-8 bg-gold" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ============ HERO ============ */}
      <section className="relative bg-gradient-hero text-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-terracotta/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <SectionLabel>Manual do Insight à Ação</SectionLabel>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-balance mb-6">
                Saia da paralisia e comece a agir com <span className="italic text-accent">clareza</span> em poucos dias.
              </h1>
              <p className="text-lg md:text-xl text-foreground/75 mb-8 leading-relaxed max-w-xl">
                Um método simples para destravar decisões, acabar com a procrastinação e transformar insights em ação real, mesmo que você esteja travado há meses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-10">
                <CTAButton />
                <a href="#dor" className="inline-flex items-center gap-2 text-foreground/80 hover:text-accent transition-colors font-medium">
                  Ver como funciona <ChevronDown className="h-4 w-4 animate-bounce" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60">
                <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-accent" /> Acesso imediato</div>
                <div className="flex items-center gap-2"><Lock className="h-4 w-4 text-accent" /> Compra 100% segura</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> Aplicação em dias</div>
              </div>

              <div className="mt-10 inline-flex items-baseline gap-3 px-6 py-4 rounded-2xl bg-card/60 backdrop-blur border border-border">
                <span className="text-sm uppercase tracking-widest text-foreground/60">Por apenas</span>
                <span className="font-serif text-4xl md:text-5xl text-accent">R$ 19,97</span>
                <span className="text-sm text-foreground/60">à vista</span>
              </div>
            </div>

            <div className="relative animate-fade-in lg:justify-self-end">
              <div className="absolute -inset-10 bg-gradient-to-tr from-terracotta/40 to-accent/30 blur-3xl rounded-full" />
              <img
                src={cover}
                alt="Capa do Manual do Insight à Ação"
                className="relative w-full max-w-md mx-auto rounded-lg shadow-elegant rotate-[-2deg] hover:rotate-0 transition-transform duration-700"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ REFLEXÃO EMOCIONAL (DOR) ============ */}
      <section id="dor" className="py-24 md:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <SectionLabel>Talvez você se reconheça aqui</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-balance mb-8">
            Você sente que a vida está passando.
            <span className="block text-accent italic">E você ainda não começou.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance mb-12">
            Você acorda com vontade de mudar. Tem ideias, sonhos e reflexões que poderiam virar algo grande. Mas o dia passa, a semana passa, o mês passa. E nada se move. Por dentro, cresce a sensação de que o tempo está escapando.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {[
              "Você se sente perdido sem saber qual o próximo passo.",
              "Tem mil ideias na cabeça e nenhuma sai do papel.",
              "Procrastina o que mais importa para você.",
              "Trava na hora de tomar decisões simples.",
            ].map((t) => (
              <div key={t} className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border">
                <X className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <p className="text-foreground/85">{t}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-xl md:text-2xl font-serif italic text-accent text-balance">
            O problema nunca foi você. Foi nunca terem te mostrado um caminho prático para sair daí.
          </p>
        </div>
      </section>

      {/* ============ APRESENTAÇÃO DA OPORTUNIDADE ============ */}
      <section className="py-24 md:py-32 bg-gradient-cream relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-terracotta/15 blur-[100px] rounded-full" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel>Existe uma virada de chave</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-balance max-w-3xl mx-auto">
              Você não precisa de mais motivação.
              <span className="block text-accent mt-2">Precisa de um <em>método</em> simples para começar.</span>
            </h2>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
              O Manual do Insight à Ação é o caminho prático que pega o que está dentro da sua cabeça e transforma em movimento real, dia após dia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, t: "Mente em ordem", d: "Tira o peso da cabeça e organiza o que importa de verdade." },
              { icon: Compass, t: "Direção clara", d: "Você descobre qual é o próximo passo, hoje, agora." },
              { icon: Map, t: "Plano simples", d: "Sai do excesso de teoria e vai direto para a aplicação." },
              { icon: Flame, t: "Ação constante", d: "Cria momentum mesmo nos dias difíceis. Você não para mais." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-card rounded-2xl p-7 shadow-soft border border-border hover:shadow-elegant transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-2xl mb-2 text-foreground">{t}</h3>
                <p className="text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BENEFÍCIOS ============ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel>O que muda em você</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-balance max-w-3xl mx-auto leading-tight">
              De mente cheia e dia perdido para <span className="italic text-accent">clareza, foco e movimento.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, t: "Clareza mental", d: "Saiba, sem ruído, o que importa de verdade hoje." },
              { icon: Compass, t: "Direção", d: "Pare de viver no improviso. Tenha um norte concreto." },
              { icon: Target, t: "Mais foco", d: "Faça menos coisas, melhor. Termine o que começa." },
              { icon: Zap, t: "Menos procrastinação", d: "Quebre o ciclo de adiar o que é importante para você." },
              { icon: Repeat, t: "Sensação de progresso diário", d: "Sinta, todo dia, que você avançou em algo real." },
              { icon: Rocket, t: "Insight em resultado", d: "Transforme aprendizado em ação aplicada na vida real." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="group p-7 rounded-2xl border border-border hover:border-accent/50 bg-card hover:bg-card/80 transition-all duration-500">
                <Icon className="h-8 w-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-2xl text-foreground mb-2">{t}</h3>
                <p className="text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <CTAButton>Começar minha transformação</CTAButton>
          </div>
        </div>
      </section>

      {/* ============ O QUE VOCÊ VAI RECEBER ============ */}
      <section className="py-24 md:py-32 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel>O que você vai receber</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-balance max-w-3xl mx-auto leading-tight">
              Tudo que você precisa para sair do <em className="text-accent not-italic">pensar</em> e ir para o <em className="text-accent not-italic">fazer</em>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { n: "01", t: "Manual digital completo", d: "Conteúdo objetivo, escrito para ser lido em poucas horas e aplicado no mesmo dia." },
              { n: "02", t: "Estrutura prática de aplicação diária", d: "Um sistema simples que encaixa na sua rotina, mesmo que ela esteja corrida." },
              { n: "03", t: "Exercícios de ação imediata", d: "Práticas que tiram você do automático e te colocam em movimento agora." },
              { n: "04", t: "Guia passo a passo de mudança", d: "Um caminho claro, sem teoria desnecessária, do bloqueio até a primeira vitória." },
              { n: "05", t: "Método para destravar decisões", d: "Pare de girar em volta da escolha. Decida com clareza e siga em frente." },
              { n: "06", t: "Plano de constância", d: "Mantenha o ritmo quando a motivação cair, sem depender dela." },
            ].map(({ n, t, d }) => (
              <div key={n} className="flex gap-5 p-6 rounded-2xl bg-card/40 border border-border backdrop-blur hover:bg-card/60 transition-colors">
                <span className="font-serif text-3xl text-accent flex-shrink-0">{n}</span>
                <div>
                  <h3 className="font-serif text-2xl mb-2 text-foreground">{t}</h3>
                  <p className="text-foreground/70 leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROVA SOCIAL ============ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel>Quem aplicou, conta</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-balance max-w-3xl mx-auto leading-tight">
              Histórias reais de quem <span className="italic text-accent">saiu do zero</span> e começou a agir.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "Mariana S.", r: "Designer", q: "Finalmente consegui sair do zero e agir. Em uma semana já estava entregando coisas que estavam paradas há meses." },
              { n: "Lucas T.", r: "Empreendedor", q: "Parecia simples, mas mudou minha forma de pensar. A diferença é que agora eu termino o que começo." },
              { n: "Renata A.", r: "Estudante", q: "Comecei a tomar decisões sem travar. Era exatamente disso que eu precisava para destravar minha vida." },
              { n: "Pedro M.", r: "Analista", q: "A clareza que esse manual trouxe não tem preço. Em poucos dias minha rotina inteira mudou." },
              { n: "Camila R.", r: "Mãe e empreendedora", q: "Eu vivia cheia de ideias e nunca tirava nada do papel. Agora eu sei exatamente o que fazer todo dia." },
              { n: "Rafael O.", r: "Profissional liberal", q: "Saí da paralisia que me travava há anos. Vale cada centavo, e muito mais." },
            ].map(({ n, r, q }) => (
              <div key={n} className="p-7 rounded-2xl bg-card border border-border hover:border-accent/40 transition-colors shadow-soft">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
                </div>
                <Quote className="h-6 w-6 text-accent/40 mb-3" />
                <p className="text-foreground/90 leading-relaxed mb-5 italic">"{q}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{n}</p>
                  <p className="text-sm text-muted-foreground">{r}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ANTES E DEPOIS ============ */}
      <section className="py-24 md:py-32 bg-gradient-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel>Antes e depois</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-balance max-w-3xl mx-auto leading-tight">
              A diferença entre <span className="italic text-muted-foreground">recomeçar</span> toda semana e <span className="italic text-accent">avançar</span> todo dia.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 md:p-10 rounded-3xl bg-card border border-border">
              <h3 className="font-serif text-3xl mb-6 text-muted-foreground">Antes</h3>
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

            <div className="p-8 md:p-10 rounded-3xl bg-gradient-cta text-primary-foreground shadow-elegant">
              <h3 className="font-serif text-3xl mb-6">Depois</h3>
              <ul className="space-y-4">
                {[
                  "Clareza sobre o próximo passo",
                  "Firmeza para decidir e executar",
                  "Ação alinhada com o que importa",
                  "Leveza no lugar da pressão constante",
                  "Direção visível, dia após dia",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OFERTA ============ */}
      <section id="oferta" className="py-24 md:py-32 bg-background">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <SectionLabel>Sua oferta de hoje</SectionLabel>
          </div>
          <div className="rounded-[2rem] bg-gradient-hero p-8 md:p-16 shadow-elegant relative overflow-hidden border border-border">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-terracotta/30 blur-3xl rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/15 blur-3xl rounded-full" />
            <div className="relative grid md:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/30 mb-5">
                  <Flame className="h-4 w-4 text-accent" />
                  <span className="text-xs uppercase tracking-widest text-accent font-semibold">Oferta por tempo limitado</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-balance mb-4">
                  Manual do Insight à Ação
                </h2>
                <p className="text-foreground/75 text-lg mb-8 max-w-lg">
                  O guia prático que tira você da paralisia e te coloca em movimento, com clareza, foco e constância.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Acesso imediato após a compra",
                    "Aplicação simples e repetível na sua rotina",
                    "Pagamento único, sem assinatura",
                    "Garantia de 7 dias",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-3 text-foreground/90">
                      <Check className="h-5 w-5 text-accent flex-shrink-0" /> {t}
                    </li>
                  ))}
                </ul>

                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-foreground/60 text-sm uppercase tracking-widest">De R$ 47 por apenas</span>
                </div>
                <div className="flex items-baseline gap-3 mb-8 -mt-6">
                  <span className="font-serif text-6xl md:text-7xl text-accent leading-none">R$ 19,97</span>
                  <span className="text-foreground/60">à vista</span>
                </div>

                <CTAButton>Quero meu acesso agora</CTAButton>

                <p className="mt-5 text-sm text-foreground/60 flex items-center gap-2">
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
              { q: "Isso funciona para mim?", a: "Se você tem ideias mas não consegue executar, se sente travado para tomar decisões ou se sente perdido sobre o próximo passo, sim, foi feito exatamente para você. Não importa sua área, sua idade ou o tamanho do seu projeto." },
              { q: "Preciso ter experiência?", a: "Não. O manual foi escrito para qualquer pessoa, em qualquer ponto da vida. A linguagem é direta, simples e prática. Você lê e aplica no mesmo dia." },
              { q: "Em quanto tempo vejo resultados?", a: "A maioria das pessoas começa a aplicar e sentir clareza nos primeiros dias. Em poucas semanas, a sensação de movimento e progresso já se torna parte da rotina." },
              { q: "Vou conseguir aplicar com rotina corrida?", a: "Foi pensado exatamente para isso. A proposta é uma execução simples e repetível, não um sistema que exige horas livres que você não tem." },
              { q: "Como recebo o material?", a: "Assim que o pagamento é confirmado, o acesso é liberado imediatamente no seu e-mail. É só abrir e começar." },
              { q: "É um pagamento único?", a: "Sim. Você paga R$ 19,97 uma única vez e tem acesso ao material. Sem mensalidade, sem cobrança recorrente." },
            ].map(({ q, a }, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-xl px-6 shadow-soft">
                <AccordionTrigger className="font-serif text-lg md:text-xl text-foreground hover:no-underline text-left py-5">
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
      <section className="py-24 md:py-36 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <BookOpen className="h-12 w-12 text-accent mx-auto mb-6" />
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-balance mb-8">
            Chegou a hora de sair da paralisia e <span className="italic text-accent">começar a agir</span> de verdade.
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed text-balance mb-10 max-w-2xl mx-auto">
            Daqui a um ano, você vai querer ter começado hoje. O Manual do Insight à Ação é a ponte entre saber e fazer. E ela começa no momento em que você decide atravessar.
          </p>
          <CTAButton>Quero meu acesso agora</CTAButton>
          <p className="mt-6 text-sm text-foreground/60">Acesso imediato • Pagamento único • Compra segura</p>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-bordeaux-deep text-foreground/60 py-10 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="font-serif text-lg text-foreground">Manual do Insight à Ação</p>
          <p>© {new Date().getFullYear()}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
