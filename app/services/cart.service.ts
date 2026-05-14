/**
 * Cart Service
 *
 * Camada de sincronização do carrinho com o backend.
 * O estado local é gerenciado pelo Zustand (useCartStore).
 * Este service será usado para sincronizar com o backend
 * quando o usuário estiver logado.
 *
 * @module services/cart.service
 */

import type { CartItem } from "@/app/types";

export const cartService = {
  /**
   * Sincroniza o carrinho local com o backend
   * Chamado após login para mesclar carrinho anônimo com o do usuário
   * @param items - Itens do carrinho local
   */
  sync: async (items: CartItem[]): Promise<void> => {
    // TODO: POST /api/cart/sync
    console.log("sync cart:", items);
  },

  /**
   * Busca o carrinho do usuário logado no backend
   * @returns Lista de itens do carrinho
   */
  get: async (): Promise<CartItem[]> => {
    // TODO: GET /api/cart
    return [];
  },

  /**
   * Adiciona item ao carrinho no backend
   */
  addItem: async (item: Omit<CartItem, "quantidade">): Promise<void> => {
    // TODO: POST /api/cart/items
    console.log("addItem:", item);
  },

  /**
   * Remove item do carrinho no backend
   */
  removeItem: async (slug: string): Promise<void> => {
    // TODO: DELETE /api/cart/items/:slug
    console.log("removeItem:", slug);
  },

  /**
   * Limpa o carrinho no backend após finalizar pedido
   */
  clear: async (): Promise<void> => {
    // TODO: DELETE /api/cart
    console.log("clear cart");
  },
};
