# Desafio Gerenciador de Projetos

O Gerenciador de projetos é um projeto formado em três parte (backend, frontend, database) resultado do desafio da Bernhoelf para techlead.

## Requisitos

Para rodar o projeto são necessários o seguintes requisitos:

- Docker;
- Docker compose (caso esteja rodando pelo docker desktop, este recurso já está automaticamente disponível)

## Comandos

Para rodar o projeto, basta estar na pasta principal do projeto por meio do terminal e rodar o comando abaixo:

```bash
docker-compose up
```

## URLs de acesso

#### Frontend

> http://localhost:3000/

#### Backend - Api

> http://localhost:3020/

## Banco de dados

Ao carregar pela primeira vez o banco de dados, alguns dados já foram inseridos para testes e melhor vizualização dos dados no frontend.

Para acessar os bano de dados use as seguintes credenciais:

```
POSTGRES_HOST=localhost
POSTGRES_USER=root
POSTGRES_DB=root
POSTGRES_PASSWORD=secret
POSTGRES_PORT=5432
```

## Frontend

Para o frontend foi inserido uma usuário root para acessar a aplicação web. Abaixo o usuário para teste:

> Usuário: admin

> Senha: admin
