/**
 * Utilitários de formatação
 *
 * Funções puras para formatação de valores monetários,
 * datas e textos usadas em todo o projeto.
 *
 * @module utils/format
 */

/**
 * Formata um valor numérico para moeda brasileira
 * @example formatCurrency(189.9) → "R$ 189,90"
 */
export const formatCurrency = (value: number): string =>
  `R$ ${value.toFixed(2).replace(".", ",")}`;

/**
 * Formata parcelamento sem juros
 * @example formatInstallment(189.9, 12) → "12x de R$ 15,83 sem juros"
 */
export const formatInstallment = (
  value: number,
  installments: number,
): string =>
  `${installments}x de ${formatCurrency(value / installments)} sem juros`;

/**
 * Trunca texto com reticências
 * @example truncate("Texto longo demais", 10) → "Texto long..."
 */
export const truncate = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

/**
 * Formata número de itens com pluralização
 * @example formatItemCount(1) → "1 item" | formatItemCount(3) → "3 itens"
 */
export const formatItemCount = (count: number): string =>
  `${count} ${count === 1 ? "item" : "itens"}`;
