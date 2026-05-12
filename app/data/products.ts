export type Produto = {
  slug: string;
  nome: string;
  preco: number;
  descricao: string;
  categoria: string;
  badge?: string;
  badgeDark?: boolean;
  caracteristicas?: { label: string; valor: string }[];
  avaliacoes?: {
    nome: string;
    nota: number;
    comentario: string;
    data: string;
  }[];
};

export const produtos: Produto[] = [
  {
    slug: "vibrador-premium",
    nome: "Vibrador Premium",
    preco: 189.9,
    descricao:
      "Vibrador de silicone médico com 10 modos de vibração e resistente à água.",
    categoria: "vibradores",
    badge: "Novo",
    caracteristicas: [
      { label: "Material", valor: "Silicone médico" },
      { label: "Modos de vibração", valor: "10 modos" },
      { label: "Resistência à água", valor: "IPX7 — submersível" },
      { label: "Carregamento", valor: "USB magnético" },
      { label: "Autonomia", valor: "Até 2 horas" },
      { label: "Comprimento", valor: "18 cm" },
      { label: "Cor", valor: "Rosa e lilás" },
    ],
    avaliacoes: [
      {
        nome: "Ana S.",
        nota: 5,
        comentario:
          "Melhor compra que já fiz! Chegou super discreto e o produto é incrível.",
        data: "10/04/2026",
      },
      {
        nome: "Mariana R.",
        nota: 5,
        comentario:
          "Qualidade excepcional, silicone macio e os modos de vibração são perfeitos.",
        data: "28/03/2026",
      },
      {
        nome: "Carla M.",
        nota: 4,
        comentario:
          "Ótimo produto, entrega rápida e embalagem discreta como prometido.",
        data: "15/03/2026",
      },
    ],
  },
  {
    slug: "estimulador-duo",
    nome: "Estimulador Duo",
    preco: 249.9,
    descricao: "Estimulador com dupla ação para experiências únicas.",
    categoria: "estimuladores",
    badge: "15% OFF",
    badgeDark: true,
  },
  {
    slug: "kit-feminino-luxo",
    nome: "Kit Feminino Luxo",
    preco: 319.9,
    descricao: "Kit completo com vibrador, estimulador e óleo massagem.",
    categoria: "kits-femininos",
    badge: "Exclusivo",
  },
  {
    slug: "masturbador-premium",
    nome: "Masturbador Premium",
    preco: 159.9,
    descricao:
      "Masturbador em material ultra-realístico com textura interna exclusiva.",
    categoria: "masturbadores",
  },
  {
    slug: "anel-extensor",
    nome: "Anel Extensor",
    preco: 89.9,
    descricao: "Anel de silicone com vibração para estimulação dupla.",
    categoria: "aneis",
  },
  {
    slug: "kit-masculino",
    nome: "Kit Masculino",
    preco: 279.9,
    descricao: "Kit completo com masturbador, anel e gel lubrificante.",
    categoria: "kits-masculinos",
    badge: "Novo",
  },
  {
    slug: "algemas-luxo",
    nome: "Algemas Luxo",
    preco: 79.9,
    descricao: "Algemas de couro sintético com forro macio e velcro ajustável.",
    categoria: "algemas",
  },
  {
    slug: "chicote-iniciante",
    nome: "Chicote Iniciante",
    preco: 69.9,
    descricao: "Chicote suave ideal para iniciantes no universo BDSM.",
    categoria: "chicote",
  },
  {
    slug: "oleo-massagem",
    nome: "Óleo Massagem Sensual",
    preco: 59.9,
    descricao: "Óleo de massagem com efeito calor e aroma de baunilha.",
    categoria: "oleos",
  },
];

export const categorias = [
  { slug: "vibradores", label: "Vibradores", grupo: "para-elas" },
  { slug: "estimuladores", label: "Estimuladores", grupo: "para-elas" },
  { slug: "kits-femininos", label: "Kits Femininos", grupo: "para-elas" },
  { slug: "lingeries", label: "Lingeries", grupo: "para-elas" },
  { slug: "masturbadores", label: "Masturbadores", grupo: "para-eles" },
  { slug: "aneis", label: "Anéis & Extensores", grupo: "para-eles" },
  { slug: "kits-masculinos", label: "Kits Masculinos", grupo: "para-eles" },
  { slug: "acessorios", label: "Acessórios", grupo: "para-eles" },
  { slug: "algemas", label: "Algemas", grupo: "sadomasoquismo" },
  { slug: "chicote", label: "Chicote", grupo: "sadomasoquismo" },
  { slug: "mordaca", label: "Mordaça", grupo: "sadomasoquismo" },
  { slug: "oleos", label: "Óleos & Géis", grupo: "geral" },
  { slug: "novidades", label: "Novidades", grupo: "geral" },
  { slug: "promocoes", label: "Promoções", grupo: "geral" },
];
