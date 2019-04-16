const AuthService = require('../authService')

const sinon = require('sinon')

// const app = require('../../../config/server')

// const mongoose = require('mongoose')

// const mongoDB = 'mongodb://localhost/testedb1'

// mongoose.connect(mongoDB, { useNewUrlParser: true })

// const request = require('supertest')

describe('AuthService test login', () => {
  it('findUser', () => {
    const MockModel = {
      find: sinon.spy()
    }
    const authService = AuthService(MockModel)
    authService.findUser('teste')
    const actual = MockModel.find.calledOnce
    expect(actual).toEqual(true)
  })
})

describe('AuthService test Register', () => {
  it('findUser', () => {
    const save = sinon.spy()
    const MockModel = function (data) {
      nome = data.nome
      email =  data.email
      password = data.password
      nivelAcesso = data.nivelAcesso
      return {
        ...data,
        save
      }
    }
    const authService = AuthService(MockModel)

    authService.createNewUser('foo', 'foo@foo.com', 'Qwe123@', 1)

    const actual = save.calledOnce
    expect(actual).toEqual(true)
  })
})

// describe('teste da rota', () => {
//   afterAll(async () => {
//     await mongoose.connection.close()
//   })

//   it('/signup new user', (done) => {
//     const data = {
//       nome: 'romulo',
//       email: 'romulogarofalo@gmail.com',
//       password: '123123',
//       nivelAcesso: 1,
//     }
//     request(app)
//       .post('/api/signup')
//       .send(data)
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(201)
//         done()
//       })
//   })

//   it('/signup repeat user', (done) => {
//     const data = {
//       nome: 'romulo',
//       email: 'romulogarofalo@gmail.com',
//       password: '123123',
//       nivelAcesso: 1,
//     }
//     request(app)
//       .post('/api/signup')
//       .send(data)
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(409)
//         done()
//       })
//   })

//   it('/login new user', (done) => {
//     const data = {
//       email: 'romulogarofalo@gmail.com',
//       password: '123123',
//     }
//     request(app)
//       .post('/api/login')
//       .send(data)
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(200)
//         done()
//       })
//   })
// })