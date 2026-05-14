/**
 * Tipos do domínio Cart
 *
 * Define a estrutura do carrinho de compras.
 * Persiste no localStorage via Zustand persist middleware.
 *
 * @module types/cart
 */

/**
 * Representa um item dentro do carrinho
 */
export type CartItem = {
  /** Slug do produto — usado como chave única */
  slug: string;
  /** Nome de exibição */
  nome: string;
  /** Preço unitário em reais */
  preco: number;
  /** Slug da categoria */
  categoria: string;
  /** Quantidade no carrinho */
  quantidade: number;
};

/**
 * Interface completa do store do carrinho
 */
export type CartStore = {
  /** Lista de itens no carrinho */
  items: CartItem[];
  /** Adiciona um item ou incrementa a quantidade se já existir */
  addItem: (item: Omit<CartItem, "quantidade">) => void;
  /** Remove um item pelo slug */
  removeItem: (slug: string) => void;
  /** Atualiza a quantidade de um item — remove se quantidade <= 0 */
  updateQuantidade: (slug: string, quantidade: number) => void;
  /** Retorna o total de itens (somando quantidades) */
  totalItems: () => number;
  /** Retorna o valor total do carrinho */
  total: () => number;
  /** Limpa o carrinho completamente */
  clearCart: () => void;
};
