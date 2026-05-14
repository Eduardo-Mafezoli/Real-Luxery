/**
 * Tipos do domínio Product
 * @module types/product
 */

/**
 * Representa uma característica técnica de um produto
 * @example { label: "Material", valor: "Silicone médico" }
 */
export type Caracteristica = {
  label: string;
  valor: string;
};

/**
 * Representa uma avaliação de produto feita por um cliente
 */
export type Avaliacao = {
  nome: string;
  /** Nota de 1 a 5 */
  nota: number;
  comentario: string;
  /** Formato: DD/MM/AAAA */
  data: string;
};

/**
 * Representa um produto completo do catálogo
 */
export type Produto = {
  /** Identificador único na URL — ex: "vibrador-premium" */
  slug: string;
  nome: string;
  descricao: string;
  preco: number;
  /** Slug da categoria — ex: "vibradores" */
  categoria: string;
  badge?: string;
  badgeDark?: boolean;
  caracteristicas?: Caracteristica[];
  /** Avaliações dos clientes — virá da API no backend */
  avaliacoes?: Avaliacao[];
  /** Produto visível no catálogo */
  ativo?: boolean;
  /** Produto sem estoque (visível mas não comprável) */
  esgotado?: boolean;
};

export type Categoria = {
  slug: string;
  label: string;
  grupo?: string;
};
