# Real Luxery — Roadmap

## Stack

| Camada   | Tecnologia                            |
| -------- | ------------------------------------- |
| Frontend | Next.js 16 + TypeScript + Tailwind v4 |
| Backend  | Fastify + Prisma + PostgreSQL + Zod   |
| Auth     | JWT + Refresh Token                   |
| Testes   | Jest + Playwright                     |
| Deploy   | Vercel (front) + Railway (back)       |

---

## Estrutura de Rotas

| Rota               | Descrição            |
| ------------------ | -------------------- |
| `/`                | Landing page         |
| `/products`        | Listagem com filtros |
| `/products/[slug]` | Produto individual   |
| `/blog`            | Listagem com filtros |
| `/blog/[slug]`     | Post individual      |

| Rota        | Descrição |
| ----------- | --------- |
| `/login`    | Login     |
| `/register` | Registro  |

### Usuário (autenticado)

| Rota                | Descrição           |
| ------------------- | ------------------- |
| `/profile`          | Dados pessoais      |
| `/profile/orders`   | Meus pedidos        |
| `/profile/payments` | Formas de pagamento |
| `/profile/reviews`  | Minhas avaliações   |
| `/cart`             | Carrinho            |
| `/checkout`         | Finalizar compra    |

### Admin (role: admin)

| Rota                  | Descrição          |
| --------------------- | ------------------ |
| `/admin`              | Dashboard overview |
| `/admin/products`     | CRUD de produtos   |
| `/admin/products/new` | Cadastrar produto  |
| `/admin/orders`       | Gestão de pedidos  |
| `/admin/customers`    | Clientes           |
| `/admin/blog`         | CRUD de posts      |
| `/admin/reviews`      | Moderar avaliações |

---

## Progresso Frontend

### Público

- [x] Landing page completa
- [x] Header com dropdown, categorias e badge do carrinho
- [x] Footer com links e redes sociais
- [x] Produtos — listagem + filtros por categoria + individual
- [x] Blog — listagem + filtros por categoria + post individual

### Auth

- [x] Página de Login com Zod + React Hook Form
- [x] Mensagens de erro genéricas (proteção contra user enumeration)
- [x] Página de Registro com Zod + React Hook Form
- [x] Recuperação de senha (forgot password)
- [x] Verificação de código alfanumérico 8 caracteres
- [x] Reset de senha com indicador de força
- [ ] Integração com backend (JWT + email)

### Usuário

- [x] Layout do perfil com sidebar
- [x] Dados pessoais — editar nome, email, telefone, CPF, data de nascimento
- [x] Meus pedidos — histórico com accordion e timeline de status
- [x] Endereços — adicionar, editar, deletar, definir padrão
- [x] Segurança — alterar senha + sessões ativas
- [x] Privacidade & LGPD — ver dados, exportar, deletar conta
- [x] Carrinho — adicionar, remover, atualizar quantidade
- [ ] Checkout — endereço + pagamento + confirmação

### Admin

- [x] Layout do dashboard com sidebar carmesim
- [x] Overview — métricas, gráfico circular por categoria, produtos mais vendidos, pedidos recentes
- [x] Produtos — listar, criar, editar, deletar, marcar esgotado/ativo
- [x] Pedidos — listar, filtrar por status, accordion com itens + endereço + timeline + código de rastreio
- [x] Blog — listar, criar, editar, publicar, despublicar posts
- [x] Avaliações — filtro automático, moderar suspeitos, aprovar, remover
- [ ] Configurações da loja

---

## Progresso Backend

- [ ] Setup — Fastify + Prisma + PostgreSQL + Zod
- [ ] Auth API — registro, login, logout, refresh token
- [ ] Users API — CRUD + roles
- [ ] Products API — CRUD + upload imagens + categorias
- [ ] Orders API — criar, listar, atualizar status
- [ ] Cart API — sincronizar com frontend
- [ ] Reviews API — criar, moderar
- [ ] Blog API — CRUD posts
- [ ] Admin API — métricas e dashboard

---

## Progresso Testes

- [ ] Setup Jest
- [ ] Testes unitários — validações Zod
- [ ] Testes unitários — store do carrinho
- [ ] Testes E2E Playwright — fluxo de compra
- [ ] Testes E2E Playwright — auth
- [ ] Testes de API — endpoints principais

---

## Progresso Segurança

- [x] Headers HTTP — X-Frame-Options, CSP, HSTS etc
- [ ] Rate limiting no backend
- [ ] Helmet no Fastify
- [ ] CORS configurado
- [ ] Sanitização de inputs
- [ ] Logs de auditoria
- [ ] LGPD — exportar e deletar dados do usuário

---

## Progresso Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Frontend — Vercel
- [ ] Backend — Railway
- [ ] Banco — PostgreSQL na Railway
- [ ] Domínio configurado
- [ ] SSL ativo

## Modelos do Banco (Prisma)

### User

    model User {
      id        String    @id @default(uuid())
      name      String
      email     String    @unique
      password  String
      role      Role      @default(CUSTOMER)
      createdAt DateTime  @default(now())
      orders    Order[]
      reviews   Review[]
      addresses Address[]
    }

    enum Role {
      CUSTOMER
      ADMIN
    }

### Product

    model Product {
      id          String   @id @default(uuid())
      name        String
      slug        String   @unique
      description String
      price       Decimal
      images      String[]
      categoryId  String
      category    Category @relation(fields: [categoryId], references: [id])
      reviews     Review[]
      createdAt   DateTime @default(now())
    }

### Order

    model Order {
      id        String      @id @default(uuid())
      userId    String
      user      User        @relation(fields: [userId], references: [id])
      items     OrderItem[]
      total     Decimal
      status    OrderStatus @default(PENDING)
      createdAt DateTime    @default(now())
    }

    enum OrderStatus {
      PENDING
      PAID
      SHIPPED
      DELIVERED
      CANCELLED
    }

### Review

    model Review {
      id        String   @id @default(uuid())
      userId    String
      productId String
      user      User     @relation(fields: [userId], references: [id])
      product   Product  @relation(fields: [productId], references: [id])
      rating    Int
      comment   String
      createdAt DateTime @default(now())
    }

---

## Fluxo de Auth

    1. Usuário faz login → POST /api/auth/login
    2. Backend valida credenciais
    3. Retorna accessToken (15min) + refreshToken (7d)
    4. Frontend armazena tokens
    5. Requisições autenticadas enviam accessToken no header
    6. Quando expirar → POST /api/auth/refresh com refreshToken
    7. Logout → DELETE /api/auth/logout (invalida refreshToken)

---

## Header Dinâmico

    Não logado:          [ Login ]
    Logado (customer):   [ Avatar ] → Perfil, Pedidos, Pagamentos, Sair
    Logado (admin):      [ Avatar ] → Perfil, Pedidos, Pagamentos, Dashboard Admin, Sair

---

## Admin Dashboard

### Visão geral (Overview)

- Total de vendas do dia, semana, mês
- Produtos mais vendidos
- Últimos pedidos
- Clientes novos

### Produtos

- Listar todos com filtro por categoria
- Cadastrar novo produto (nome, descrição, preço, imagens, categoria)
- Editar produto existente
- Ativar / desativar produto

### Pedidos

- Listar todos os pedidos
- Filtrar por status (pendente, pago, enviado, entregue, cancelado)
- Ver detalhes do pedido
- Atualizar status

### Clientes

- Listar todos os clientes
- Ver histórico de compras por cliente

### Blog

- Listar posts
- Criar novo post
- Editar post existente
- Publicar / despublicar

### Avaliações

- Listar todas as avaliações
- Aprovar ou remover avaliações

---

## Git Flow

### Estrutura de branches

    main          ← produção estável
    └── develop   ← integração
        ├── feat/auth
        ├── feat/cart
        ├── feat/profile
        ├── feat/checkout
        ├── feat/admin
        └── feat/backend-setup

### Comandos padrão

    # Nova feature
    git checkout develop
    git checkout -b feat/nome

    # Commitar
    git add .
    git commit -m "feat: descrição"
    git push -u origin feat/nome

    # Merge com --no-ff para manter tree visual
    git checkout develop
    git merge --no-ff feat/nome -m "merge: feat/nome into develop"
    git push origin develop

    # Quando feature for para produção
    git checkout main
    git merge --no-ff develop -m "merge: develop into main - vX.X.X"
    git push origin main

---

## Convenção de Commits

| Prefixo  | Uso                               |
| -------- | --------------------------------- |
| feat     | nova funcionalidade               |
| fix      | correção de bug                   |
| chore    | configuração, dependências        |
| docs     | documentação                      |
| refactor | refatoração sem nova feature      |
| test     | testes                            |
| style    | formatação, sem mudança de lógica |

---

## Como usar este arquivo em novas conversas

Cole o conteúdo deste arquivo no início de uma nova conversa com Claude para retomar o desenvolvimento de onde parou. O arquivo contém todo o contexto do projeto, stack, progresso e decisões tomadas.
