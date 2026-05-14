/**
 * Blog Service
 *
 * Camada de acesso a dados do blog.
 * Todos os métodos estão preparados para integração com a API REST.
 *
 * @module services/blog.service
 */

import type { Post, CategoriaBlog } from "@/app/types";

export const blogService = {
  /**
   * Retorna todos os posts publicados
   */
  getAll: async (): Promise<Post[]> => {
    // TODO: GET /api/blog
    return [];
  },

  /**
   * Retorna post em destaque
   */
  getDestaque: async (): Promise<Post | undefined> => {
    // TODO: GET /api/blog/destaque
    return undefined;
  },

  /**
   * Busca um post pelo slug
   * @param slug - Identificador único do post
   */
  getBySlug: async (slug: string): Promise<Post | undefined> => {
    // TODO: GET /api/blog/:slug
    return undefined;
  },

  /**
   * Filtra posts por categoria
   * @param categoria - Slug da categoria
   */
  getByCategoria: async (categoria: string): Promise<Post[]> => {
    // TODO: GET /api/blog?categoria=:categoria
    return [];
  },

  /**
   * Retorna todas as categorias do blog
   */
  getCategorias: async (): Promise<CategoriaBlog[]> => {
    // TODO: GET /api/blog/categories
    return [];
  },

  /**
   * Cria um novo post
   */
  create: async (data: Omit<Post, "slug">): Promise<Post> => {
    // TODO: POST /api/blog
    throw new Error("Not implemented");
  },

  /**
   * Atualiza um post existente
   */
  update: async (slug: string, data: Partial<Post>): Promise<Post> => {
    // TODO: PATCH /api/blog/:slug
    throw new Error("Not implemented");
  },

  /**
   * Remove um post
   */
  delete: async (slug: string): Promise<void> => {
    // TODO: DELETE /api/blog/:slug
    throw new Error("Not implemented");
  },

  /**
   * Publica ou despublica um post
   */
  setPublicado: async (slug: string, publicado: boolean): Promise<void> => {
    // TODO: PATCH /api/blog/:slug/publish
    throw new Error("Not implemented");
  },
};
