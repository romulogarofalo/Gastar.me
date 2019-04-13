const mongoose = require('mongoose')

const mongoDB = 'mongodb://localhost/testedb1'

mongoose.connect(mongoDB, { useNewUrlParser: true })

const User = require('../../user/userModel')

describe('User Model test', () => {
  beforeAll(async () => {
    await User.remove({})
  })

  afterEach(async () => {
    await User.remove({})
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('has a module', () => {
    expect(User).toBeDefined()
  })

  // describe('get user', () => {
  //   it('')
  // })
})
