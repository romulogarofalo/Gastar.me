const mongoose = require('mongoose')

const mongoDB = 'mongodb://localhost/testedb1'

mongoose.connect(mongoDB, { useNewUrlParser: true })

const request = require('supertest')

const { expect } = require('chai')

const app = require('../../../config/server')

const AuthController = require('../authController')

describe('Auth integration tests', () => {
  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('/signup new user', (done) => {
    const data = {
      nome: 'romulo',
      email: 'romulogarofalo@gmail.com',
      password: '123123',
      nivelAcesso: 1,
    }
    request(app)
      .post('/api/signup')
      .send(data)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(201)
        done()
      })
  })

  it('/signup repeat user', (done) => {
    const data = {
      nome: 'romulo',
      email: 'romulogarofalo@gmail.com',
      password: '123123',
      nivelAcesso: 1,
    }
    request(app)
      .post('/api/signup')
      .send(data)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(409)
        done()
      })
  })

  it('/login new user', (done) => {
    const data = {
      email: 'romulogarofalo@gmail.com',
      password: '123123',
    }
    request(app)
      .post('/api/login')
      .send(data)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        done()
      })
  })
})
