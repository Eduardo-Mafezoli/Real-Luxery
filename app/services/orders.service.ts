/**
 * Order Service
 *
 * Camada de acesso a dados de pedidos.
 *
 * @module services/order.service
 */

import type { Order } from "@/app/types";

export const orderService = {
  /**
   * Retorna todos os pedidos do usuário logado
   */
  getAll: async (): Promise<Order[]> => {
    // TODO: GET /api/orders
    return [];
  },

  /**
   * Busca um pedido pelo ID
   * @param id - ID do pedido — ex: "#RL-2026-001"
   */
  getById: async (id: string): Promise<Order | undefined> => {
    // TODO: GET /api/orders/:id
    console.log("getById:", id);
    return undefined;
  },

  /**
   * Cria um novo pedido
   * Chamado ao finalizar o checkout
   */
  create: async (data: {
    enderecoId: number;
    metodoPagamento: "cartao" | "pix" | "boleto";
  }): Promise<{ id: string }> => {
    // TODO: POST /api/orders
    console.log("create order:", data);
    return { id: "#RL-2026-999" };
  },
};
