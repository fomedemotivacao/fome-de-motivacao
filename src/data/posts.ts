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
  content: string[]; // parágrafos e subtítulos (prefixo "## " vira h2)
}

export const posts: Post[] = [
  {
    slug: "como-sair-da-paralisia-por-analise",
    title: "Como sair da paralisia por análise em 3 passos",
    description:
      "Por que pensar demais trava a ação e um método simples de três passos para voltar a decidir e executar todos os dias.",
    date: "2026-08-12",
    readingTime: "6 min",
    category: "Produtividade",
    tags: ["paralisia por análise", "tomada de decisão", "produtividade", "execução", "clareza mental"],
    wordCount: 320,
    content: [
      "Paralisia por análise acontece quando o cérebro confunde preparação com progresso. Você pesquisa, compara, planeja, mas nunca chega ao movimento. O resultado é uma sensação constante de esforço sem avanço.",
      "## 1. Reduza o tamanho da decisão",
      "Decisões grandes travam porque exigem certeza. Divida a escolha até chegar em algo que você consiga testar em menos de 48 horas. Não decida a carreira inteira, decida a próxima conversa.",
      "## 2. Defina um critério de parada",
      "Antes de pesquisar, escreva quantas opções você vai avaliar e em quanto tempo. Sem critério de parada, a busca por informação vira fuga da responsabilidade de escolher.",
      "## 3. Transforme a dúvida em experimento",
      "Toda dúvida vira uma hipótese testável. Em vez de perguntar ‘e se der errado?’, pergunte ‘qual é o menor teste que me dá uma resposta real?’. A ação gera dados, e dados dissolvem a paralisia.",
      "Clareza não vem antes do movimento. Ela nasce dele. Cada pequeno passo elimina uma variável e devolve o controle da sua rotina.",
    ],
  },
  {
    slug: "motivacao-nao-e-suficiente-crie-sistemas",
    title: "Motivação não é suficiente: crie sistemas que sustentam a ação",
    description:
      "Motivação é um pico emocional passageiro. Veja como construir sistemas simples que mantêm a execução funcionando mesmo nos dias ruins.",
    date: "2026-08-05",
    readingTime: "5 min",
    category: "Mentalidade",
    tags: ["motivação", "sistemas", "hábitos", "disciplina", "consistência"],
    wordCount: 290,
    content: [
      "Quem depende de motivação executa em picos e desaparece nos vales. Quem depende de sistema executa em média, e a média sustentada vence o pico isolado.",
      "## O que é um sistema na prática",
      "Um sistema é uma decisão tomada uma única vez que elimina dezenas de decisões futuras. Horário fixo, local fixo, primeira tarefa definida na véspera. Nada disso exige vontade no momento da execução.",
      "## Torne o começo ridiculamente fácil",
      "A maior resistência está nos primeiros dois minutos. Se a tarefa começa com algo trivial, o corpo entra em movimento e a mente acompanha. O objetivo do dia ruim não é performar, é não quebrar a seqüência.",
      "## Meça constância, não intensidade",
      "Registre apenas se você cumpriu ou não. O registro visual cria compromisso e mostra o padrão real do seu comportamento, sem julgamento e sem autoengano.",
      "Motivação é bem-vinda quando aparece. O sistema é o que garante que ela não seja necessária.",
    ],
  },
  {
    slug: "clareza-mental-rotina-diaria",
    title: "Clareza mental: a rotina diária de 15 minutos que organiza prioridades",
    description:
      "Um ritual curto de revisão diária para descarregar a mente, escolher o que importa e começar o dia sabendo exatamente o próximo passo.",
    date: "2026-07-28",
    readingTime: "4 min",
    category: "Clareza",
    tags: ["clareza mental", "rotina", "prioridades", "produtividade", "organização"],
    wordCount: 270,
    content: [
      "A mente não foi feita para armazenar tarefas, foi feita para resolvê-las. Quando tudo fica na cabeça, o custo mental de lembrar consome a energia que deveria ir para a execução.",
      "## Descarregue tudo em cinco minutos",
      "Escreva sem filtro tudo o que está aberto: compromissos, pendências, preocupações e ideias. O objetivo não é organizar, é esvaziar.",
      "## Separe o que é ação do que é ruído",
      "Ao lado de cada item, marque se existe um próximo passo concreto. O que não tem passo concreto vira nota, não vira tarefa. Isso reduz a lista pela metade na maioria dos dias.",
      "## Escolha três e proteja o primeiro",
      "Três prioridades, uma delas inegociável. Bloqueie o horário do primeiro item antes que o dia seja tomado por urgências dos outros.",
      "Quinze minutos de organização compram horas de foco. Clareza não é um talento, é um hábito de revisão.",
    ],
  },
  {
    slug: "transformar-insight-em-acao",
    title: "Do insight à ação: por que boas ideias morrem e como evitar isso",
    description:
      "Ideias não faltam. Falta um caminho entre a inspiração e a execução. Entenda as três falhas mais comuns e como corrigí-las.",
    date: "2026-07-19",
    readingTime: "6 min",
    category: "Execução",
    tags: ["insight", "execução", "ideias", "próximos passos", "produtividade"],
    wordCount: 310,
    content: [
      "O insight é uma faísca. Sem estrutura, ele apaga em poucas horas e volta apenas como frustração: ‘eu já tinha pensado nisso’.",
      "## Falha 1: o insight não é capturado",
      "Tenha um único lugar para registrar ideias. Se o registro depende do lugar onde você está, ele não acontece. Um bloco no celular já resolve.",
      "## Falha 2: o insight não vira próximo passo",
      "Uma ideia sem verbo não sai do papel. Transforme ‘quero mudar de área’ em ‘enviar mensagem para duas pessoas que já trabalham nessa área até sexta’.",
      "## Falha 3: não existe revisão",
      "Uma vez por semana, revise a lista e escolha um único insight para executar. Um executado vale mais que vinte guardados.",
      "Executar é uma habilidade trinável. Ela começa quando você trata a ideia como um projeto pequeno, e não como um sonho grande.",
    ],
  },
  {
    slug: "disciplina-nos-dias-ruins",
    title: "Disciplina nos dias ruins: como manter o progresso sem se cobrar demais",
    description:
      "Constância real inclui dias de baixa energia. Estratégias práticas para não quebrar o ritmo quando a vontade some.",
    date: "2026-07-10",
    readingTime: "5 min",
    category: "Mentalidade",
    tags: ["disciplina", "consistência", "hábitos", "mentalidade", "autocrítica"],
    wordCount: 280,
    content: [
      "Todo plano funciona no dia bom. O que define o resultado é o comportamento no dia ruim, quando o cansaço e a frustração aparecem juntos.",
      "## Tenha uma versão mínima de cada hábito",
      "Se o treino são 40 minutos, a versão mínima são 8. Se a escrita são 1000 palavras, a versão mínima são 100. A regra é simples: nunca zero.",
      "## Separe fracasso de interrupção",
      "Perder um dia é interrupção. Perder dois seguidos começa a virar padrão. Volte no dia seguinte e a queda vira um detalhe irrelevante no gráfico do mês.",
      "## Reduza a autocrítica a uma pergunta útil",
      "Em vez de ‘por que eu sou assim?’, pergunte ‘o que tornaria amanhã 10% mais fácil?’. A segunda pergunta gera ajuste, a primeira gera paralisia.",
      "Progresso não é uma linha reta. É uma média que você protege ao longo do tempo.",
    ],
  },
  {
    slug: "metas-que-funcionam",
    title: "Metas que funcionam: menos objetivos, mais próximos passos",
    description:
      "Como definir metas realistas, ligar cada uma a um comportamento diário e acompanhar o avanço sem planilhas complicadas.",
    date: "2026-07-02",
    readingTime: "5 min",
    category: "Produtividade",
    tags: ["metas", "objetivos", "planejamento", "comportamento", "revisão semanal"],
    wordCount: 275,
    content: [
      "Metas falham quando descrevem um resultado sem descrever o comportamento que o produz. ‘Ganhar mais’ não é uma meta, é um desejo.",
      "## Uma meta por área, no máximo",
      "Excesso de metas dilui a energia. Escolha uma por área da vida durante 90 dias e aceite que o resto fica em manutenção.",
      "## Traduza a meta em comportamento semanal",
      "Todo objetivo precisa virar frequência: quantas vezes por semana e por quanto tempo. É isso que você controla, o resultado é consequência.",
      "## Revise a cada 7 dias",
      "Uma revisão curta semanal identifica desvios cedo. Ajustar o plano não é desistir, é manter o plano vivo diante da realidade.",
      "Menos metas, mais próximos passos. É assim que a intenção vira progresso visível.",
    ],
  },
];

export const getPost = (slug?: string) => posts.find((p) => p.slug === slug);
