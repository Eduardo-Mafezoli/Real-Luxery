/**
 * Tipos do domínio Blog
 *
 * Define a estrutura de posts e categorias do blog.
 *
 * @module types/blog
 */

/**
 * Representa um post completo do blog
 */
export type Post = {
  /** Identificador único na URL — ex: "como-escolher-vibrador" */
  slug: string;
  /** Título do post */
  titulo: string;
  /** Resumo curto exibido nos cards da listagem (máx 200 chars) */
  resumo: string;
  /** Conteúdo completo do post */
  conteudo: string;
  /** Slug da categoria — ex: "dicas" */
  categoria: string;
  /** Nome do autor */
  autor: string;
  /** Data de publicação — formato DD/MM/AAAA */
  data: string;
  /** Tempo estimado de leitura — ex: "5 min" */
  tempoLeitura: string;
  /** Se true, aparece em destaque na listagem */
  destaque?: boolean;
  /** Se false, post em rascunho — não aparece no blog */
  publicado?: boolean;
};

/**
 * Representa uma categoria do blog
 */
export type CategoriaBlog = {
  slug: string;
  label: string;
};
