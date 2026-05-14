/**
 * Product Service
 *
 * Camada de acesso a dados de produtos.
 * Todos os métodos estão preparados para integração com a API REST.
 *
 * @remarks
 * Para integrar com o backend, implemente o corpo de cada função
 * com fetch para o endpoint correspondente. As assinaturas não mudam.
 *
 * @example
 * async getAll(): Promise<Produto[]> {
 *   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
 *   return res.json();
 * }
 *
 * @module services/product.service
 */

import type { Produto, Categoria } from "@/app/types";

export const productService = {
  /**
   * Retorna todos os produtos ativos
   * @returns Lista de produtos
   */
  getAll: async (): Promise<Produto[]> => {
    // TODO: GET /api/products
    return [];
  },

  /**
   * Busca um produto pelo slug
   * @param slug - Identificador único do produto
   * @returns Produto encontrado ou undefined
   */
  getBySlug: async (slug: string): Promise<Produto | undefined> => {
    // TODO: GET /api/products/:slug
    return undefined;
  },

  /**
   * Filtra produtos por categoria
   * @param categoria - Slug da categoria
   */
  getByCategoria: async (categoria: string): Promise<Produto[]> => {
    // TODO: GET /api/products?categoria=:categoria
    return [];
  },

  /**
   * Retorna todas as categorias disponíveis
   */
  getCategorias: async (): Promise<Categoria[]> => {
    // TODO: GET /api/categories
    return [];
  },

  /**
   * Busca produtos por texto
   * @param query - Texto de busca
   */
  search: async (query: string): Promise<Produto[]> => {
    // TODO: GET /api/products?q=:query
    return [];
  },

  /**
   * Cria um novo produto
   * @param data - Dados do produto
   */
  create: async (data: Omit<Produto, "slug">): Promise<Produto> => {
    // TODO: POST /api/products
    throw new Error("Not implemented");
  },

  /**
   * Atualiza um produto existente
   * @param slug - Identificador do produto
   * @param data - Dados atualizados
   */
  update: async (slug: string, data: Partial<Produto>): Promise<Produto> => {
    // TODO: PATCH /api/products/:slug
    throw new Error("Not implemented");
  },

  /**
   * Remove um produto
   * @param slug - Identificador do produto
   */
  delete: async (slug: string): Promise<void> => {
    // TODO: DELETE /api/products/:slug
    throw new Error("Not implemented");
  },

  /**
   * Marca produto como esgotado ou disponível
   * @param slug - Identificador do produto
   * @param esgotado - Novo estado de estoque
   */
  setEsgotado: async (slug: string, esgotado: boolean): Promise<void> => {
    // TODO: PATCH /api/products/:slug/stock
    throw new Error("Not implemented");
  },
};
