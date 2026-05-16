# Real Luxery Frontend — Roadmap

## Stack

| Camada      | Tecnologia                  |
| ----------- | --------------------------- |
| Framework   | Next.js 16 + App Router     |
| Linguagem   | TypeScript                  |
| Estilo      | Tailwind v4                 |
| Estado      | Zustand                     |
| Formulários | React Hook Form + Zod       |
| Ícones      | Phosphor Icons              |
| Deploy      | Vercel                      |

---

## Arquitetura
app/
├── types/      <- tipos centralizados por domínio
├── services/   <- camada de dados (prontos pro backend)
├── hooks/      <- lógica separada da UI
├── utils/      <- funções puras reutilizáveis
├── store/      <- estado global (Zustand)
└── components/ <- componentes reutilizáveis

---

## Progresso

### Público
- [x] Landing page completa
- [x] Header com dropdown, categorias e badge do carrinho
- [x] Footer com links e redes sociais
- [x] Produtos — listagem + filtros por categoria + individual
- [x] Blog — listagem + filtros por categoria + post individual

### Auth
- [x] Login com mensagens genéricas (anti user enumeration)
- [x] Registro com validação Zod
- [x] Forgot password
- [x] Verify code (8 chars alfanumérico)
- [x] Reset password com indicador de força
- [ ] Integração com backend (JWT + refresh token)

### Usuário
- [x] Layout do perfil com sidebar
- [x] Dados pessoais com máscaras (CPF, telefone, data)
- [x] Meus pedidos — accordion + timeline de status
- [x] Endereços — CRUD + padrão
- [x] Segurança — alterar senha + sessões ativas
- [x] Privacidade e LGPD — ver dados, exportar, deletar conta
- [x] Carrinho — adicionar, remover, atualizar quantidade
- [x] Checkout — endereço + pagamento + confirmação
- [ ] Integração com backend

### Admin
- [x] Layout com sidebar carmesim
- [x] Dashboard — métricas + gráfico circular + ranking produtos
- [x] Produtos — CRUD + esgotado/ativo
- [x] Pedidos — accordion + timeline + código de rastreio
- [x] Blog — CRUD + publicar/despublicar
- [x] Avaliações — filtro automático + moderação
- [ ] Configurações da loja
- [ ] Integração com backend

---

## Segurança Implementada
- [x] Headers HTTP (X-Frame-Options, CSP, HSTS)
- [x] Mensagens de erro genéricas no login
- [x] Código de recuperação alfanumérico 8 chars
- [ ] Integração com rate limiting do backend

---

## Deploy
- [ ] Vercel configurado
- [ ] Variáveis de ambiente de produção
- [ ] Domínio configurado

---

## Versões
- v0.1.0 — Landing, produtos, blog
- v0.2.0 — Cart, account structure
- v0.3.0 — Admin complete
- v0.4.0 — Checkout
- v0.5.0 — Clean architecture

---

## Git Flow

### Branches
main      <- produção estável
develop   <- integração
feat/*    <- features

### Commits
| Prefixo  | Uso                        |
| -------- | -------------------------- |
| feat     | nova funcionalidade        |
| fix      | correção de bug            |
| chore    | configuração, dependências |
| docs     | documentação               |
| refactor | refatoração                |
| test     | testes                     |