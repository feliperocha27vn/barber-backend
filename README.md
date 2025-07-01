# 💈 Barber Shop API

Uma API RESTful desenvolvida com Node.js, Fastify e Prisma para gerenciamento de barbearias, seus serviços e informações de contato.

## 📋 Índice

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Banco de Dados](#banco-de-dados)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## 📖 Sobre

O Barber Shop API é um sistema backend completo para gerenciamento de barbearias, permitindo o cadastro de estabelecimentos, seus serviços oferecidos e informações de contato. A API foi desenvolvida seguindo os princípios SOLID e Clean Architecture, garantindo um código limpo, testável e escalável.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Fastify](https://www.fastify.io/)** - Framework web rápido e eficiente
- **[Prisma](https://www.prisma.io/)** - ORM moderno para Node.js e TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Zod](https://zod.dev/)** - Validação de esquemas TypeScript-first
- **[Vitest](https://vitest.dev/)** - Framework de testes unitários e e2e
- **[Docker](https://www.docker.com/)** - Containerização da aplicação
- **[JWT](https://jwt.io/)** - Autenticação baseada em tokens
- **[Bcrypt](https://www.npmjs.com/package/bcryptjs)** - Hash de senhas
- **[Biome](https://biomejs.dev/)** - Linter e formatador de código

## ✨ Funcionalidades

### Barbearias
- ✅ Cadastro de novas barbearias
- ✅ Autenticação (login) de barbearias
- ✅ Busca de barbearias por nome
- ✅ Visualização de detalhes de uma barbearia específica
- ✅ Gerenciamento de informações de endereço completo

### Serviços
- ✅ Cadastro de serviços oferecidos pela barbearia
- ✅ Listagem de serviços de uma barbearia
- ✅ Atualização de informações de serviços
- ✅ Exclusão de serviços
- ✅ Visualização de detalhes de um serviço específico

### Telefones
- ✅ Cadastro de múltiplos telefones por barbearia
- ✅ Classificação de tipos de telefone (celular, fixo, etc.)

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/barber-backend.git
cd barber-backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados com Docker:
```bash
docker-compose up -d
```

## ⚙️ Configuração

1. Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente no arquivo `.env`:
```env
# Porta do servidor
PORT=3333

# URL de conexão com o banco de dados PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/barbershop?schema=public"

# Secret para geração de tokens JWT
JWT_SECRET="seu-secret-super-seguro-aqui"
```

3. Execute as migrations do Prisma para criar as tabelas no banco de dados:
```bash
npx prisma migrate dev
```

4. (Opcional) Gere o cliente do Prisma:
```bash
npx prisma generate
```

## 🏃‍♂️ Executando o Projeto

### Modo de desenvolvimento:
```bash
npm run dev
```

### Build para produção:
```bash
npm run build
```

### Executar em produção:
```bash
npm start
```

O servidor estará rodando em `http://localhost:3333`

## 🧪 Testes

O projeto possui testes unitários e testes end-to-end (e2e).

### Executar todos os testes:
```bash
# Testes unitários
npm test

# Testes e2e
npm run test:e2e

# Testes com coverage
npm run test:coverage
```

## 📁 Estrutura do Projeto

```
barber-backend/
├── prisma/
│   ├── migrations/        # Migrations do banco de dados
│   ├── schema.prisma      # Schema do Prisma
│   └── vitest-environment-prisma/  # Ambiente de testes
├── src/
│   ├── @types/           # Definições de tipos TypeScript
│   ├── factories/        # Factory pattern para criação de instâncias
│   ├── http/
│   │   └── controllers/  # Controllers da aplicação
│   │       ├── barber-shop/     # Controllers de barbearias
│   │       └── services-barber-shop/  # Controllers de serviços
│   ├── in-memory/        # Repositórios in-memory para testes
│   ├── lib/              # Configurações de bibliotecas
│   ├── middlewares/      # Middlewares da aplicação
│   ├── repositories/     # Repositórios (padrão Repository)
│   ├── use-cases/        # Casos de uso (regras de negócio)
│   ├── app.ts           # Configuração do Fastify
│   ├── env.ts           # Validação de variáveis de ambiente
│   └── server.ts        # Entrada da aplicação
├── docker-compose.yml    # Configuração do Docker
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração do TypeScript
├── vite.config.ts       # Configuração do Vitest
└── biome.json          # Configuração do Biome (linter)
```

## 🔌 API Endpoints

### Autenticação

#### Registrar Barbearia
```http
POST /barbearia/register
Content-Type: application/json

{
  "nome": "Barbearia do João",
  "email": "contato@barbeariadojoao.com.br",
  "senha": "123456",
  "area_atendimento": "Centro",
  "CEP": "01310-100",
  "estado": "SP",
  "cidade": "São Paulo",
  "bairro": "Bela Vista",
  "logradouro": "Avenida Paulista",
  "numero": "1578",
  "complemento": "Sala 205"
}
```

#### Login
```http
POST /barbearia/login
Content-Type: application/json

{
  "email": "contato@barbeariadojoao.com.br",
  "senha": "123456"
}
```

### Barbearias

#### Buscar Barbearias por Nome
```http
GET /barbearia/search?nome=João
Authorization: Bearer {token}
```

#### Obter Detalhes de uma Barbearia
```http
GET /barbearia/{id}
Authorization: Bearer {token}
```

### Serviços

#### Criar Serviço
```http
POST /servicos
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Corte de Cabelo",
  "descricao": "Corte masculino tradicional",
  "preco": 35.00,
  "barber_shop_id": "uuid-da-barbearia"
}
```

#### Listar Serviços de uma Barbearia
```http
GET /servicos/barbearia/{barber_shop_id}
Authorization: Bearer {token}
```

#### Obter Detalhes de um Serviço
```http
GET /servicos/{id}
Authorization: Bearer {token}
```

#### Atualizar Serviço
```http
PUT /servicos/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Corte de Cabelo Premium",
  "descricao": "Corte masculino com acabamento especial",
  "preco": 45.00
}
```

#### Deletar Serviço
```http
DELETE /servicos/{id}
Authorization: Bearer {token}
```

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL como banco de dados. O diagrama do banco pode ser visualizado em:
[https://dbdiagram.io/d/Copy-of-BarberShop-6834f8306980ade2eb82ac1d](https://dbdiagram.io/d/Copy-of-BarberShop-6834f8306980ade2eb82ac1d)

### Principais Tabelas:

- **barber_shop**: Armazena informações das barbearias
- **services**: Serviços oferecidos pelas barbearias
- **barber_shop_phones**: Telefones de contato das barbearias

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Utilize o Biome para formatação e linting do código
- Siga os princípios SOLID e Clean Architecture
- Escreva testes para novas funcionalidades
- Mantenha a cobertura de testes acima de 80%

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com 💜 por Felipe Rocha
