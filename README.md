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
|/api/login              | login route and auth                       | POST         |
|/api/signup             | register of new user                       | POST         |
|/api/wallets            | create new wallet                          | POST         |
|/api/wallets            | get infos about the wallet                 | GET          |
|/api/wallets            | only ADM can use to delete specific wallet | DELETE       |
|/api/cards              | register new card in wallet                | POST         |
|/api/cards              | return all cards                           | GET          |
|/api/cards              | delete a card                              | DELETE       |
|/api/buy                | make new buy                               | POST         |
|/api/bill               | get the value of current bill              | GET          |
|/api/bill               | pay the current bill                       | POST         |
[for more datails here the link for Postman docs](https://documenter.getpostman.com/view/1994420/S1EQUJaE)

## All Tasks
Routes 
- [x] Authentication morning 10/04 2:00
     - [x] sign up
     - [x] login
- [x] List Cards 10/04 afternoon 17:50
- [x] Add Card 10/04 afternoon 17:00
- [x] Remove Card 10/04 evening 23:14
- [x] Get Wallet 10/04 evening 18:00
- [x] Buy 15/04 afternoon 15:00
- [x] Pay bill
- [x] Register (done with authentication)
- [x] Create wallet 10/04 15:00
- [x] Administrative - List wallets  15/04 afternoon 17:03
- [x] Administrative - Delete wallet 15/04 afternoon 17:03

Jobs
- [ ] Notificação de fatura fechada

Documentation
- [x] Link with all routes on postoman
- [ ] JSDoc

Testes
- [x] Authentication
    - [x] integration
    - [ ] Unit (1 left)
- [x] Cards
    - [x] integration
    - [x] Unit
- [x] Wallets
    - [x] integration
- [x] Buys
    - [x] integration
    - [ ] Unit
- [ ] Bill
    - [ ] integration
    - [ ] Unit

Infrastructure
- [x] use travis or circle.ci
- [ ] Integrate with Coveralls (tool to do covarage tests)
- [ ] auto deploy on Heroku
- [ ] configs pre-commit

## Useful Links
[style guilde that was chosen to follow](https://github.com/i0natan/nodebestpractices/blob/master/README.brazilian-portuguese.md#1-pr%C3%A1ticas-de-estrutura-de-projeto)  
[Linter used](https://github.com/pagarme/javascript-style-guide)  
[commit pattern used](https://gist.github.com/adeekshith/cd4c95a064977cdc6c50)  
[nice pattern for emogis](https://gitmoji.carloscuesta.me/?fbclid=IwAR3JhM6m-s7l3XEYPN9vtlZwatGQvxhk8ETzHqbAg5pV5PCH8ajoxzORRQM)  