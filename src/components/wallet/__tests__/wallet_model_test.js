const mongoose = require('mongoose')

const mongoDB = 'mongodb://mongo:27017/testedb1'
// const mongoDB = 'mongodb://localhost/testedb1'

mongoose.connect(mongoDB, { useNewUrlParser: true })

const Wallet = require('../walletModel')

describe('Wallet Model test', () => {
  beforeAll(async () => {
    await Wallet.remove({})
  })

  afterEach(async () => {
    await Wallet.remove({})
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('has a module', () => {
    expect(Wallet).toBeDefined()
  })

  // describe('get Wallet', () => {
  //   it('')
  // })
})
