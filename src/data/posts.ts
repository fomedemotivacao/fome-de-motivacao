export interface ImageCredit {
  author: string;
  authorLink: string;
  unsplashLink: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO YYYY-MM-DD
  modifiedDate?: string; // ISO YYYY-MM-DD (se diferente de date)
  readingTime: string;
  category: string;
  tags: string[];
  wordCount?: number;
  offerEbook?: boolean; // controle de frequência: a cada 3 artigos
  image?: string; // URL absoluta (Unsplash) ou caminho relativo (/og/slug)
  imageCredit?: ImageCredit; // crédito obrigatório pela Unsplash API License
  content: string[]; // parágrafos e subtítulos (prefixo "## " vira h2)
}

// PROMPT MESTRE — GERAÇÃO DE ARTIGOS PARA FOME DE MOTIVAÇÃO
// Prioridade editorial: VERDADE → UTILIDADE → REFLEXÃO → MOTIVAÇÃO
// Mínimo de 1.220 palavras por artigo.
// Leão como arquétipo narrativo, nunca como fórmula mágica.
// Sem travessão (— ou –). Substituir por vírgula, ponto ou dois-pontos.
// offerEbook: true apenas a cada 3 artigos (artigos 3, 6, 9...).
// Variáveis dinâmicas disponíveis nos metadados de cada post:
//   tema_desc, angulo, sensacao, palavra_chave, contador_artigo, oferecer_ebook
// image: usar URL do Unsplash retornada pelo workflow (UNSPLASH_API_KEY)

export const posts: Post[] = [
  {
    slug: "por-que-sua-energia-e-nao-seu-relogio-decide-o-que-voce-realmente-real",
    title: "Por que sua energia, e não seu relógio, decide o que você realmente realiza",
    description: "Exploramos por que administrar energia, mais do que contar horas, é essencial para usar o tempo com intenção e obter resultados reais.",
    date: "2026-08-22",
    readingTime: "6 min",
    category: "Produtividade",
    tags: ["como gerenciar o tempo de forma eficiente","gestão do tempo","desenvolvimento pessoal","mentalidade","autoconhecimento"],
    wordCount: 1287,
    offerEbook: false,
    image: "https://images.unsplash.com/photo-1431499012454-31a9601150c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDM3NzY4fDB8MXxzZWFyY2h8NXx8dGltZSUyMG1hbmFnZW1lbnQlMjBwcm9kdWN0aXZpdHl8ZW58MHwwfHx8MTc4NzM3Mzg5NHww&ixlib=rb-4.1.0&q=80&w=1080",
    imageCredit: { author: "Veri Ivanova", authorLink: "https://unsplash.com/@veri_ivanova?utm_source=fome_de_motivacao&utm_medium=referral", unsplashLink: "https://unsplash.com/photos/person-holding-white-and-silver-colored-pocket-watch-p3Pj7jOYvnM?utm_source=fome_de_motivacao&utm_medium=referral" },
    content: [
      "Quando olhamos para a lista de tarefas do dia, costumamos pensar que o problema está em não ter horas suficientes. A sensação de estar atrasado, de deixar compromissos para trás ou de não avançar nos projetos faz com que a solução imediata seja tentar apretar o cronograma, acordar mais cedo ou dormir menos. Essa abordagem trata o tempo como um recurso fixo, como se cada minuto fosse uma moeda de mesmo valor, independentemente de como nos sentimos ao gastá‑lo. Porém, a experiência mostra que duas horas de trabalho realizadas com atenção plena podem produzir mais do que quatro horas feitas em estado de cansaço ou distração. O fator que realmente determina o que conseguimos realizar não é a quantidade de horas disponíveis, mas a qualidade da energia que temos para investir nelas.",
      "A gestão do tempo tradicional foca na divisão do dia em blocos, na criação de listas de prioridades e no uso de técnicas como o método Pomodoro ou o bloqueio de calendário. Essas ferramentas são úteis para organizar compromissos e evitar que obrigações se sobreponham. Porém, elas partem do pressuposto de que nossa capacidade de desempenho permanece constante ao longo do dia. Quando ignoramos as variações naturais de disposição, acabamos tentando executar atividades complexas em momentos em que nosso corpo e nossa mente estão pedindo descanso. O resultado é uma sensação de esforço desperdiçado, de procrastinação disfarçada de produtividade e de frustração porque, apesar de estar ocupado, os resultados esperados não aparecem.",
      "A energia, ao contrário do relógio, não é uniforme. Ela oscila conforme fatores como sono, alimentação, movimento físico, estresse emocional e até mesmo o ambiente ao nosso redor. Manhãs após uma boa noite de descanso carregam uma qualidade diferente das tardes pesadas ou das noites em que a cabeça ainda está processando conversas difíceis. Reconhecer esses ciclos não é fraqueza nem desculpa para a procrastinação. É inteligência estratégica aplicada ao próprio desempenho. Quando você aprende a mapear seus picos e vales de energia ao longo do dia, deixa de lutar contra sua própria biologia e começa a trabalhar com ela.",
      "## O ritmo natural do desempenho humano",
      "Pesquisadores que estudam os ritmos circadianos identificaram que a maioria das pessoas atravessa ciclos de aproximadamente noventa minutos de maior concentração seguidos de períodos de menor alerta. Esse padrão, chamado de ciclo ultradiano, existe mesmo quando estamos acordados e tentando manter o foco. Ignorar esses ciclos é como tentar correr uma maratona em velocidade de sprint do início ao fim. O resultado é a exaustão precoce e o desempenho abaixo do potencial justamente nas tarefas que mais importam. Adaptar o dia a esses ritmos significa colocar o trabalho mais complexo nos momentos de pico e reservar as atividades rotineiras para os vales.",
      "A questão prática que surge é como identificar esses momentos sem recorrer a equipamentos ou testes laboratoriais. Uma maneira simples é manter um diário de energia durante uma semana, registrando em intervalos de duas horas como você se sente em uma escala de um a dez. Com poucos dias de observação, padrões começam a aparecer. Você pode notar que entre nove e onze da manhã sua capacidade de análise é notavelmente maior, enquanto logo após o almoço o raciocínio fica mais lento. Esses dados pessoais valem mais do que qualquer fórmula genérica de produtividade porque refletem a sua fisiologia específica.",
      "## Alocar tarefas com base em energia, não em urgência",
      "Uma das armadilhas mais comuns na gestão do tempo é organizar o dia pela urgência das tarefas em vez de pela demanda cognitiva de cada uma delas. Quando você reserva suas melhores horas para responder e-mails ou participar de reuniões rotineiras, e deixa a criação de estratégias ou a resolução de problemas complexos para quando já está cansado, o resultado é previsível. As tarefas mais importantes recebem menos do que merecem e as menos importantes consomem recursos que não se recuperam facilmente. A reorganização intencional dessas alocações pode representar um avanço real sem que você trabalhe mais uma única hora.",
      "Isso não significa ignorar prazos ou deixar urgências sem resposta. Significa criar um esqueleto do dia onde os primeiros blocos de alta energia são protegidos para o trabalho que realmente move agulha. Reuniões e tarefas administrativas são empurradas para os períodos de menor alerta. Essa reorganização costuma gerar uma sensação estranha no começo, porque vai contra o hábito de responder ao que chega primeiro. Mas os resultados aparecem rápido. Projetos que estavam parados por semanas avançam em horas quando recebem sua melhor atenção.",
      "## O papel do descanso na produtividade real",
      "Existe uma crença persistente de que pausas são perdas de tempo. Essa ideia é conveniente para uma cultura que valoriza a aparência de ocupação acima de tudo, mas ela contradiz o que sabemos sobre como o cérebro recupera a capacidade de focar. Estudos em neurociência mostram que o descanso ativo, aquele que envolve caminhadas curtas, respiração consciente ou simplesmente deixar a mente vagar por alguns minutos, permite que o córtex pré-frontal se recupere e volte a operar em alto desempenho. Não é coincidência que muitas ideias surgem no banho, durante uma caminhada ou em momentos de aparente inatividade.",
      "Incorporar micro pausas ao longo do dia não é preguiça disfarçada. É manutenção preventiva do sistema que você mais precisa para trabalhar. A diferença entre quem entrega resultados consistentes e quem oscila entre dias produtivos e dias perdidos frequentemente está na forma como essas pessoas tratam o descanso. Os primeiros encaram como parte do processo. Os segundos sentem culpa por parar e acabam chegando ao final do dia esgotados sem ter entregado o que precisavam.",
      "## Começar pelo renovável, não pelo urgente",
      "Uma mudança de perspectiva que transforma a relação com o tempo é substituir a pergunta o que precisa ser feito hoje pela pergunta como posso começar esse dia de um jeito que me deixe em melhor estado do que quando acordei. Isso pode parecer um luxo distante da realidade de quem tem lista interminável de compromissos. Mas a lógica é simples: se você começa o dia já esgotado por preocupações não resolvidas, ou se pula diretamente para o consumo passivo de notificações, está gastando energia antes mesmo de começar a trabalhar.",
      "Pequenos rituais matinais que renovam a energia antes de qualquer demanda externa, como dez minutos de movimento físico, cinco minutos de escrita ou simplesmente uma xícara de café sem celular, criam uma base diferente para o resto do dia. Não porque são mágicos, mas porque sinalizam ao sistema nervoso que você está no controle do seu tempo, não sendo controlado por ele. Esse senso de agência, mesmo que pequeno, reduz o estresse basal e melhora a qualidade das decisões tomadas ao longo do dia.",
      "## Energia como estratégia de longo prazo",
      "No fim, a gestão da energia não é uma técnica isolada. É uma postura em relação à vida produtiva que reconhece os limites reais do ser humano e trabalha dentro deles com inteligência. Quem trata o próprio corpo e a própria mente como máquinas inevitavelmente encontra o ponto de ruptura, seja em forma de burnout, desmotivação crônica ou queda de desempenho que se torna difícil de reverter. Quem entende que a energia é o recurso mais valioso e trata sua renovação com a mesma seriedade que trata seus compromissos profissionais constrói uma base sustentável para resultados reais.",
      "O relógio continuará marcando as mesmas vinte e quatro horas para todo mundo. A diferença entre quem avança e quem apenas ocupa o tempo está em como cada um investe a energia que tem disponível. Isso não se resolve com mais disciplina no sentido de se forçar a trabalhar mais. Resolve-se com mais consciência sobre quando você está em condições de entregar o melhor de si e com a coragem de proteger esses momentos das demandas que podem esperar."
    ]
  }
];

export const getPost = (slug: string | undefined) =>
  posts.find((p) => p.slug === slug);
