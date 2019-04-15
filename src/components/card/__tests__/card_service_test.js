const sinon = require('sinon')

const CardService = require('../cardService')

describe('CardService test create', () => {
  it('create Wallet', () => {
    const save = sinon.spy()
    const MockModel = function (data) {
      reqBody = data.reqBody
      return {
        ...data,
        save
      }
    }
    const cardService = CardService(MockModel)
    cardService.addCard('reqbody')
    expect(save.calledOnce).toEqual(true)
  }) 
})
