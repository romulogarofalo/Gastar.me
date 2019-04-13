# GASTAR ME

[![CircleCI](https://circleci.com/gh/romulogarofalo/Gastar.me/tree/master.svg?style=svg)](https://circleci.com/gh/romulogarofalo/Gastar.me/tree/master)

style guilde que foi escolhido para seguir
https://github.com/i0natan/nodebestpractices/blob/master/README.brazilian-portuguese.md#1-pr%C3%A1ticas-de-estrutura-de-projeto

linter utilizado
https://github.com/pagarme/javascript-style-guide

### Tasks

Rotas 
- [x] Autenticação terminado dia 10/04 2:00
     - [x] registro de usuario
     - [x] login
- [x] Listar cartões 10/04 tarde 17:50
- [x] Adicionar cartão 10/04 tarde 17:00
- [x] Remover cartão 10/04 noite 23:14
- [x] Ver wallet 10/04 noite 18:00
- [ ] Comprar (terminar os casos que faltam)
- [ ] Pagar fatura
- [x] Cadastro (feito junto com a autenticação)
- [x] Criação de wallet 10/04 15:00
- [ ] Administrativo - Listar wallets 
- [ ] Administrativo - Deletar wallet

Testes
- [x] Autenticação
- [ ] cartoes
- [ ] wallets
- [ ] compras

Infraestrutura
- [x] usar travis ou circle.ci
- [ ] auto deploy no Heroku
- [ ] configurações pre-commit

| Rotas                  | Descrição                                  | Metodos HTTP |
|------------------------|--------------------------------------------|--------------|
|/api/login              | rota de login para autenticação            | POST         |
|/api/signup             | faz o registro de um novo usuario          | POST         |
|/api/wallets            | faz o criação de uma nova wallet           | POST         |
|/api/wallets            | retorna as informações da wallet do usuario| GET          |
|/api/cards              | registra um novo cartao na wallet          | POST         |
|/api/cards              | retorna todos os cartoes cadastrados       | GET          |
|/api/cards              | deleta um cartao                           | DELETE       |
