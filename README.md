# GASTAR ME


[![CircleCI](https://circleci.com/gh/romulogarofalo/Gastar.me/tree/master.svg?style=svg)](https://circleci.com/gh/romulogarofalo/Gastar.me/tree/master)

:scroll: A backend to centralize the spending of more than one credit card

## Table of Contents
- [Introduction](#introduction)
- [Technology](#technology)
- [Getting Started](#getting-started)
  - [Running Locally](#running-locally)
  - [Running Tests](#running-tests)
- [Available Routes](#available-routes)
- [All Tasks](#tasks)
- [Useful Links](#useful-links)  
  
## Introduction
*Gastar.me it's a backend to centralize the spending of more than one credit card and make it easy for you

## Technology
What was used:
- **[Docker](https://docs.docker.com)** and **[Docker Compose](https://docs.docker.com/compose/)** to create our development and test environments.
- **[CircleCI](https://circleci.com)** for ~~deployment~~ and as general CI.
- **[Mongodb](https://www.mongodb.com/)** to store the data and **[Mongoose](https://mongoosejs.com/)** as a Node.js ODM (object data modeling).
- **[Jest](https://github.com/facebook/jest)** as a framework for tests.
- **[Npm](https://www.npmjs.com/)** as a package manager.

## Getting Started
To get started, you should install **Docker** and **Docker Compose**.
Then, clone the repository:
```sh
$ git clone https://github.com/romulogarofalo/Gastar.me.git
```
You should run 
```
npm install
```
to install all the dependencies
# Running Locally
To run locally, simply run the following command:
```sh
$ docker-compose up
```
# Running Tests
To run the tests, run the following command:
```sh
$ npm test
```
## Available Routes

Rotas 

| Rotas                  | Descrição                                  | Metodos HTTP |
|------------------------|--------------------------------------------|--------------|
|/api/login              | rota de login para autenticação            | POST         |
|/api/signup             | faz o registro de um novo usuario          | POST         |
|/api/wallets            | faz o criação de uma nova wallet           | POST         |
|/api/wallets            | retorna as informações da wallet do usuario| GET          |
|/api/wallets            | only ADM can use to delete specific wallet | DELETE       |
|/api/cards              | registra um novo cartao na wallet          | POST         |
|/api/cards              | retorna todos os cartoes cadastrados       | GET          |
|/api/cards              | deleta um cartao                           | DELETE       |
|/api/buy                |                                            | POST         |
|/api/bill               |                                            | GET          |
|/api/bill               |                                            | POST         |
[for more datails here the link for Postman docs](https://documenter.getpostman.com/view/1994420/S1EQUJaE)

## All Tasks
Rotas 
- [x] Autenticação terminado dia 10/04 2:00
     - [x] registro de usuario
     - [x] login
- [x] Listar cartões 10/04 tarde 17:50
- [x] Adicionar cartão 10/04 tarde 17:00
- [x] Remover cartão 10/04 noite 23:14
- [x] Ver wallet 10/04 noite 18:00
- [x] Comprar 15/04 tarde 15:00
- [x] Pagar fatura
- [x] Cadastro (feito junto com a autenticação)
- [x] Criação de wallet 10/04 15:00
- [x] Administrativo - Listar wallets  15/04 tarde 17:03
- [x] Administrativo - Deletar wallet 15/04 tarde 17:03

Jobs
- [ ] Notificação de fatura fechada

Documentação
- [ ] Link com rotas feitas no postoman 
- [ ] JSDoc

Testes
- [x] Auticacao
    - [x] Integração
    - [ ] Unitario
- [x] Cartoes
    - [x] Integração
    - [ ] Unitario
- [x] Wallets
    - [x] Integração
- [ ] Compras
    - [ ] Integração
    - [ ] Unitario
- [ ] Fatura
    - [ ] Integração
    - [ ] Unitario

Infraestrutura
- [x] usar travis ou circle.ci
- [ ] Integração com Coveralls (ferramenta que mostra o covarage dos testes)
- [ ] auto deploy no Heroku
- [ ] configurações pre-commit

## Useful Links
[style guilde that was chosen to follow](https://github.com/i0natan/nodebestpractices/blob/master/README.brazilian-portuguese.md#1-pr%C3%A1ticas-de-estrutura-de-projeto)
[Linter used](https://github.com/pagarme/javascript-style-guide)
[commit pattern used](https://gist.github.com/adeekshith/cd4c95a064977cdc6c50)
[nice pattern for emogis](https://gitmoji.carloscuesta.me/?fbclid=IwAR3JhM6m-s7l3XEYPN9vtlZwatGQvxhk8ETzHqbAg5pV5PCH8ajoxzORRQM)