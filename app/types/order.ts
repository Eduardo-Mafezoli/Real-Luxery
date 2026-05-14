/**
 * Tipos do domínio Order
 *
 * Define a estrutura de pedidos e seus status.
 *
 * @module types/order
 */

/**
 * Status possíveis de um pedido
 * Segue o fluxo: Processando → Em separação → Em transporte → Entregue
 */
export type OrderStatus =
  | "Processando"
  | "Em separação"
  | "Em transporte"
  | "Entregue"
  | "Cancelado";

/**
 * Representa um item dentro de um pedido
 */
export type OrderItem = {
  nome: string;
  preco: number;
  qty: number;
};

/**
 * Representa uma etapa na timeline de rastreamento
 */
export type TimelineStep = {
  label: string;
  /** Data e hora da etapa — null se ainda não ocorreu */
  data: string | null;
  concluido: boolean;
};

/**
 * Representa um pedido completo
 */
export type Order = {
  /** ID único do pedido — ex: "#RL-2026-001" */
  id: string;
  /** Nome do cliente (sem dados sensíveis) */
  cliente: string;
  /** Endereço de entrega formatado */
  endereco: string;
  /** CEP de entrega */
  cep: string;
  /** Valor total em reais */
  total: number;
  /** Status atual do pedido */
  status: OrderStatus;
  /** Data do pedido — formato DD/MM/AAAA */
  data: string;
  /** Lista de itens comprados */
  itens: OrderItem[];
  /** Timeline de rastreamento */
  timeline: TimelineStep[];
  /** Código de rastreio dos Correios — preenchido pelo admin */
  codigoRastreio?: string;
};
