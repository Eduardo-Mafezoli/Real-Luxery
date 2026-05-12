export type Post = {
  slug: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  autor: string;
  data: string;
  tempoLeitura: string;
  destaque?: boolean;
};

export const categoriasBlog = [
  { slug: "dicas", label: "Dicas & Tutoriais" },
  { slug: "reviews", label: "Reviews" },
  { slug: "saude", label: "Saúde & Bem-estar" },
  { slug: "relacionamentos", label: "Relacionamentos" },
];

export const posts: Post[] = [
  {
    slug: "como-escolher-vibrador",
    titulo: "Como escolher seu primeiro vibrador",
    resumo:
      "Guia completo para quem está começando e quer fazer a escolha certa sem erros.",
    conteudo: `Escolher o primeiro vibrador pode parecer intimidador, mas com as informações certas fica muito mais fácil. Primeiro, pense no material: silicone médico é sempre a melhor opção por ser hipoalergênico e fácil de higienizar. Segundo, considere o tamanho — para iniciantes, modelos menores e mais discretos são ideais. Terceiro, verifique os modos de vibração: mais opções significam mais possibilidades de descoberta. Por último, sempre verifique a resistência à água, já que facilita muito a higienização.`,
    categoria: "dicas",
    autor: "Equipe Real Luxery",
    data: "10/05/2026",
    tempoLeitura: "5 min",
    destaque: true,
  },
  {
    slug: "beneficios-prazer-saude-mental",
    titulo: "Benefícios do prazer para a saúde mental",
    resumo:
      "Estudos mostram como a satisfação sexual impacta positivamente o bem-estar geral.",
    conteudo: `A ciência já comprova: o prazer sexual tem impactos diretos e positivos na saúde mental. A liberação de endorfinas e oxitocina durante o orgasmo reduz o cortisol — hormônio do estresse — e melhora o humor de forma significativa. Além disso, a prática regular de autoconhecimento corporal aumenta a autoestima e a confiança. Estudos da Universidade de Ottawa apontam que pessoas com vida sexual satisfatória apresentam menores índices de ansiedade e depressão.`,
    categoria: "saude",
    autor: "Equipe Real Luxery",
    data: "05/05/2026",
    tempoLeitura: "7 min",
  },
  {
    slug: "top-5-produtos-2026",
    titulo: "Top 5 produtos mais vendidos de 2026",
    resumo: "Os queridinhos da nossa comunidade que você precisa conhecer.",
    conteudo: `2026 chegou com novidades incríveis e nossa comunidade já elegeu os favoritos. Em primeiro lugar, o Vibrador Premium segue imbatível pela qualidade do silicone e variedade de modos. Em segundo, o Kit Sensações conquistou casais em todo o Brasil. Em terceiro, o Óleo Massagem Sensual virou item obrigatório nas noites especiais. Confira a lista completa e descubra qual é o ideal para você.`,
    categoria: "reviews",
    autor: "Equipe Real Luxery",
    data: "01/05/2026",
    tempoLeitura: "4 min",
  },
  {
    slug: "comunicacao-no-relacionamento",
    titulo: "Como a comunicação melhora sua vida íntima",
    resumo:
      "Conversar sobre desejos e limites é o primeiro passo para uma vida a dois mais plena.",
    conteudo: `A comunicação é a base de qualquer relacionamento saudável, especialmente quando falamos de intimidade. Expressar desejos, limites e fantasias de forma aberta e respeitosa cria um ambiente de confiança que potencializa a conexão entre parceiros. Comece com pequenas conversas fora do momento íntimo, escolha um ambiente confortável e use linguagem positiva ao invés de críticas.`,
    categoria: "relacionamentos",
    autor: "Equipe Real Luxery",
    data: "28/04/2026",
    tempoLeitura: "6 min",
  },
  {
    slug: "guia-iniciantes-bdsm",
    titulo: "Guia para iniciantes no universo BDSM",
    resumo:
      "Segurança, consentimento e prazer: tudo que você precisa saber antes de começar.",
    conteudo: `O universo BDSM é muito mais amplo e seguro do que os estereótipos sugerem. A base de tudo é o SSC — Safe, Sane and Consensual (Seguro, Sensato e Consensual). Antes de qualquer experiência, converse com seu parceiro sobre limites, palavras de segurança e expectativas. Comece com acessórios básicos como vendas e algemas de velcro, que são mais seguros para iniciantes.`,
    categoria: "dicas",
    autor: "Equipe Real Luxery",
    data: "20/04/2026",
    tempoLeitura: "8 min",
  },
  {
    slug: "higienizacao-produtos",
    titulo: "Como higienizar seus produtos corretamente",
    resumo:
      "Manter seus produtos limpos é essencial para a saúde e durabilidade deles.",
    conteudo: `A higienização correta dos seus produtos íntimos é fundamental para a saúde e para a vida útil dos itens. Produtos de silicone podem ser lavados com água morna e sabão neutro ou higienizador específico. Nunca use álcool em produtos de silicone pois danifica o material. Seque bem antes de guardar e mantenha em saquinhos próprios para evitar contato com poeira.`,
    categoria: "saude",
    autor: "Equipe Real Luxery",
    data: "15/04/2026",
    tempoLeitura: "3 min",
  },
];
