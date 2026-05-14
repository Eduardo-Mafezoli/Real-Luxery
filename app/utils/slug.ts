/**
 * Utilitários de slug
 *
 * Funções para gerar e validar slugs URL-friendly.
 * Usadas nos formulários de criação de produtos e posts.
 *
 * @module utils/slug
 */

/**
 * Gera um slug URL-friendly a partir de um texto
 *
 * @remarks
 * - Remove acentos e caracteres especiais
 * - Converte para minúsculas
 * - Substitui espaços por hífens
 * - Remove caracteres não alfanuméricos
 *
 * @example generateSlug("Vibrador Premium Silicone") → "vibrador-premium-silicone"
 * @example generateSlug("Óleo & Géis") → "oleo-geis"
 */
export const generateSlug = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/**
 * Valida se um slug está no formato correto
 * @example isValidSlug("vibrador-premium") → true
 * @example isValidSlug("Vibrador Premium") → false
 */
export const isValidSlug = (slug: string): boolean => /^[a-z0-9-]+$/.test(slug);
