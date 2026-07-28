# 📚 UniBrechó

<p align="center">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql&logoColor=white" />
</p>

---

## 📖 Sobre o projeto

O **UniBrechó** é um marketplace de economia circular desenvolvido para a comunidade acadêmica da Universidade de Fortaleza (Unifor).

A plataforma permite que estudantes publiquem anúncios de produtos usados, realizem doações, encontrem materiais acadêmicos e entrem em contato diretamente com o anunciante por meio do WhatsApp.

O principal objetivo é incentivar o reaproveitamento de produtos dentro do ambiente universitário, reduzindo desperdícios e promovendo uma cultura de sustentabilidade.

Este projeto foi desenvolvido como parte do **Desafio Técnico do Laboratório Vortex (UNIFOR)**.

---

# ✨ Funcionalidades

O sistema possui as seguintes funcionalidades:

- Cadastro de usuários
- Login de usuários
- Autenticação
- Atualização dos dados do perfil
- Alteração de senha
- Cadastro de anúncios
- Exclusão de anúncios
- Listagem de anúncios
- Visualização detalhada dos anúncios
- Contato com o anunciante via WhatsApp
- Sistema de favoritos
- Dashboard do usuário
- Listagem dos próprios anúncios
- Carrossel de favoritos
- Página personalizada para rotas inexistentes (404)
- Interface responsiva

---

# 🏗 Arquitetura

O projeto foi dividido em duas aplicações independentes.

```text
               React + TypeScript
                       │
                       │ HTTP (REST)
                       ▼
              Spring Boot (API)
                       │
                Spring Data JPA
                       │
                       ▼
                    MySQL
```

O Frontend é responsável pela interface do usuário.

O Backend implementa toda a lógica de negócio e disponibiliza uma API REST.

O banco MySQL armazena usuários, anúncios e favoritos.

---

# 🛠 Tecnologias utilizadas

## Frontend

- React
- TypeScript
- Vite
- React Router DOM
- Lucide React
- CSS3

---

## Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Maven
- Jakarta Validation

---

## Banco de dados

- MySQL

---

## Ferramentas

- Git
- GitHub
- VS Code
- IntelliJ IDEA
- Postman

---

# 📂 Estrutura do projeto

```text
UniBrecho
│
├── UniBrecho-FRONTEND
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   ├── routes
│   │   └── App.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── UniBrecho-BACKEND
│   ├── src
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   ├── service
│   │   └── config
│   │
│   ├── pom.xml
│   └── application.properties
│
└── README.md
```

---

# 🎯 Objetivos do projeto

O UniBrechó foi desenvolvido com o objetivo de:

- incentivar a economia circular;
- facilitar a compra e venda entre estudantes;
- incentivar a reutilização de materiais acadêmicos;
- diminuir o desperdício;
- proporcionar experiência prática com React e Spring Boot;
- aplicar conceitos de APIs REST;
- utilizar banco de dados relacional;
- desenvolver uma aplicação Full Stack moderna.

---

# 📱 Funcionalidades implementadas

## 👤 Usuários

- Cadastro
- Login
- Atualização de perfil
- Alteração de senha

---

## 📦 Anúncios

- Cadastro
- Exclusão
- Listagem
- Visualização dos detalhes

---

## ❤️ Favoritos

- Adicionar favorito
- Remover favorito
- Consultar favoritos
- Carrossel de favoritos na Dashboard

---

## 📞 Contato

Cada anúncio permite que o usuário entre em contato diretamente com o anunciante através do WhatsApp utilizando uma mensagem pré-formatada.

---

## 📊 Dashboard

A Dashboard apresenta:

- quantidade de anúncios publicados;
- quantidade de favoritos;
- lista dos anúncios do usuário;
- carrossel de favoritos;
- acesso rápido às principais funcionalidades.

---

## 🎨 Interface

A interface foi desenvolvida seguindo a identidade visual da Universidade de Fortaleza, utilizando tons predominantes de azul e amarelo institucional, além de componentes responsivos para diferentes tamanhos de tela.

---

# ⚙️ Requisitos

Antes de executar o projeto, é necessário possuir os seguintes softwares instalados:

- Java JDK 21 ou superior
- Maven 3.9+
- Node.js 20 ou superior
- npm
- MySQL 8+
- Git

---

# 💾 Banco de Dados

Crie um banco de dados MySQL chamado:

```sql
CREATE DATABASE unibrecho;
```

Após criar o banco, configure o arquivo:

```text
src/main/resources/application.properties
```

Exemplo:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/unibrecho
spring.datasource.username=root
spring.datasource.password=sua_senha

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

> O Hibernate criará automaticamente as tabelas necessárias na primeira execução da aplicação.

---

# ▶️ Executando o Backend

Entre na pasta do backend:

```bash
cd UniBrecho-BACKEND
```

Compile o projeto:

```bash
mvn clean install
```

Execute a aplicação:

```bash
mvn spring-boot:run
```

O backend ficará disponível em:

```text
http://localhost:8080
```

---

# 💻 Executando o Frontend

Entre na pasta do frontend:

```bash
cd UniBrecho-FRONTEND
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

A aplicação será iniciada em:

```text
http://localhost:5173
```

---

# 🔄 Comunicação entre Frontend e Backend

O frontend consome a API REST desenvolvida em Spring Boot utilizando requisições HTTP.

Base URL:

```text
http://localhost:8080
```

---

# 📡 Principais Endpoints da API

## 👤 Usuários

### Cadastrar usuário

```http
POST /usuarios
```

### Login

```http
POST /usuarios/login
```

### Atualizar perfil

```http
PUT /usuarios/{id}
```

---

## 📦 Produtos

### Cadastrar anúncio

```http
POST /produtos
```

### Listar anúncios

```http
GET /produtos
```

### Buscar anúncio

```http
GET /produtos/{id}
```

### Listar anúncios do usuário

```http
GET /produtos/usuario/{usuarioId}
```

### Excluir anúncio

```http
DELETE /produtos/{id}
```

---

## ❤️ Favoritos

### Favoritar anúncio

```http
POST /favoritos
```

### Remover favorito

```http
DELETE /favoritos?usuarioId={usuarioId}&produtoId={produtoId}
```

### Verificar favorito

```http
GET /favoritos/status?usuarioId={usuarioId}&produtoId={produtoId}
```

### Listar favoritos

```http
GET /favoritos/usuario/{usuarioId}
```

---

# 🗄️ Estrutura do Banco de Dados

O banco de dados é composto pelas seguintes entidades principais:

## Usuario

| Campo | Tipo |
|--------|------|
| id | Long |
| nome | String |
| email | String |
| telefone | String |
| senha | String |

---

## Produto

| Campo | Tipo |
|--------|------|
| id | Long |
| titulo | String |
| descricao | String |
| preco | BigDecimal |
| categoria | String |
| tipo | String |
| imagem | String |
| disponivel | Boolean |
| usuario_id | Long |

---

## Favorito

Tabela responsável pelo relacionamento entre usuários e produtos favoritos.

| Campo | Tipo |
|--------|------|
| id | Long |
| usuario_id | Long |
| produto_id | Long |

---

# 🔒 Regras de Negócio

O sistema implementa as seguintes regras:

- Apenas usuários cadastrados podem publicar anúncios.
- Um anúncio pertence a apenas um usuário.
- Um usuário pode possuir vários anúncios.
- Um usuário pode favoritar diversos anúncios.
- O mesmo anúncio não pode ser favoritado duas vezes pelo mesmo usuário.
- O contato com o anunciante é realizado exclusivamente via WhatsApp.
- Usuários podem editar seus próprios dados cadastrais.
- A alteração de senha exige confirmação da nova senha.
- Apenas anúncios do próprio usuário podem ser excluídos pela Dashboard.

---

# 📷 Telas do Sistema

O sistema possui as seguintes interfaces:

- Landing Page
- Login
- Cadastro de Usuário
- Home
- Detalhes do Produto
- Dashboard
- Perfil
- Cadastro de Novo Anúncio
- Página 404 (Not Found)


---

# 🤖 Diário de Bordo da Inteligência Artificial

Durante o desenvolvimento do **UniBrechó**, ferramentas de Inteligência Artificial foram utilizadas como apoio ao desenvolvimento, pesquisa, depuração de erros e refinamento da interface. O uso dessas ferramentas ocorreu de forma ética, sempre acompanhado de validação manual, testes e adaptações ao contexto do projeto.

---

# 🧠 Ferramentas Utilizadas

Ao longo do desenvolvimento foram utilizadas as seguintes ferramentas:

- ChatGPT (OpenAI)
- Google Gemini

As ferramentas auxiliaram principalmente em:

- Desenvolvimento de componentes React;
- Estruturação da API REST em Spring Boot;
- Correção de erros envolvendo JPA e Hibernate;
- Modelagem de DTOs;
- Ajustes de responsividade;
- Refatoração de código;
- Geração de ideias para melhoria da interface;
- Organização da documentação do projeto.

Em todos os casos, as respostas fornecidas pelas ferramentas foram analisadas, testadas e adaptadas antes de serem incorporadas ao projeto.

---

# 💬 Estratégia de Engenharia de Prompts

Durante o desenvolvimento foram utilizados diversos prompts para resolver problemas específicos.

## Exemplo 1

**Objetivo:** Construção da Dashboard.

> Desenvolva uma Dashboard moderna em React + TypeScript para um marketplace universitário chamado UniBrechó. Utilize uma sidebar fixa, cards estatísticos, listagem de anúncios, responsividade e uma identidade visual baseada nas cores institucionais da Universidade de Fortaleza.

Resultado obtido:

- criação da estrutura inicial da Dashboard;
- organização dos componentes;
- adaptação manual do layout para atender às necessidades do projeto.

---

## Exemplo 2

**Objetivo:** Resolver erro de serialização do Hibernate.

> Corrija o erro "Type definition error: ByteBuddyInterceptor" retornando DTOs em vez das entidades JPA. Explique quais alterações devem ser feitas no Service, Controller e DTO.

Resultado obtido:

- eliminação do problema de serialização;
- implementação de DTOs específicos para produtos;
- melhoria da arquitetura da API.

---

## Exemplo 3

**Objetivo:** Implementar o sistema de favoritos.

> Desenvolva o fluxo completo de favoritos utilizando React, Spring Boot e JPA. O sistema deve permitir favoritar, desfavoritar, listar favoritos do usuário e verificar se um produto já está favoritado.

Resultado obtido:

- implementação completa do módulo de favoritos;
- integração entre frontend e backend;
- atualização dinâmica da interface.

---

# 🔍 Reflexão Crítica

Embora as ferramentas de IA tenham acelerado significativamente o desenvolvimento, nem todas as respostas puderam ser utilizadas diretamente.

Um dos principais problemas encontrados ocorreu durante a implementação do módulo de favoritos. Inicialmente foi sugerido retornar diretamente as entidades do Hibernate pela API. Essa abordagem gerou erros de serialização relacionados ao **ByteBuddyInterceptor**, devido aos relacionamentos carregados de forma lazy.

Após analisar os logs da aplicação, foi identificado que a melhor solução seria criar DTOs específicos para as respostas da API, evitando o retorno direto das entidades. A arquitetura foi então refatorada e o problema foi completamente resolvido.

Outro exemplo ocorreu durante a implementação da Dashboard, quando algumas sugestões utilizaram propriedades inexistentes ou nomes incorretos de atributos. Essas inconsistências foram identificadas durante os testes e corrigidas manualmente antes da integração ao projeto.

Essas situações demonstraram a importância de utilizar a Inteligência Artificial como ferramenta de apoio ao desenvolvimento, mantendo sempre uma análise crítica sobre o código gerado.

---

# 📚 Aprendizados Obtidos

O uso da Inteligência Artificial proporcionou ganhos importantes durante o desenvolvimento, como:

- maior produtividade;
- redução do tempo de pesquisa;
- aprendizado de novas práticas em React e Spring Boot;
- melhor compreensão da arquitetura em camadas;
- aperfeiçoamento da modelagem utilizando DTOs;
- melhoria da organização do código;
- maior facilidade na identificação e resolução de erros.

Ao mesmo tempo, o projeto reforçou a necessidade de validar cuidadosamente todas as sugestões fornecidas pela IA antes de utilizá-las em produção.

---

# 🚀 Melhorias Futuras

Como evolução do projeto, pretende-se implementar:

- Upload de imagens utilizando armazenamento em nuvem;
- Pesquisa por nome do produto;
- Filtros avançados por categoria e preço;
- Chat interno entre usuários;
- Sistema de notificações;
- Avaliação de vendedores;
- Histórico de conversas;
- Recuperação de senha por e-mail;
- Publicação da aplicação em ambiente de produção;
- Testes automatizados de frontend e backend.

---

# 👨‍💻 Autor

**João Gabriel**

Desenvolvido como parte do **Desafio Técnico – Laboratório Vortex (Universidade de Fortaleza)**.

---

# 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins acadêmicos e de avaliação técnica no processo seletivo do Laboratório Vortex da Universidade de Fortaleza.

