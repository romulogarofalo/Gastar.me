const sinon = require('sinon')

const WalletService = require('../walletService')

describe('WalletService test create', () => {
  it('create Wallet', () => {
    const save = sinon.spy()
    const MockModel = function (data) {
      return {
        ...data,
        save
      }
    }
    const walletService = WalletService(MockModel)
    walletService.createNewWallet('usuarioId')
    const actual = save.calledOnce
    expect(actual).toEqual(true)
  })
})

describe('WalletService test find', () => {
  it('find wallet' , () => {
    const MockModel = {
      find: sinon.spy()
    }
    const walletService = WalletService(MockModel)
    walletService.findWallet('teste')
    const actual = MockModel.find.calledOnce
    expect(actual).toEqual(true)
  })
})
