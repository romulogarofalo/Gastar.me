const AuthService = require('../authService')

const sinon = require('sinon')

describe('AuthService test login', () => {
  it('findUser' , () => {
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
  it('findUser' , () => {
    const save = sinon.spy()
    const MockModel = function(data){
      reqbody = {}
      nome = data.nome
      email =  data.email
      password = data.password
      
      return {
        ...data,
        save
      }
    }
    console.log()
    const authService = AuthService(MockModel)

    authService.createNewUser('foo', 'foo@foo.com', 'Qwe123@')

    const actual = save.calledOnce
    expect(actual).toEqual(true)
  })

})