const sinon = require('sinon')

const moment = require('moment')

const BuyService = require('../buyService')

const walletExample  = {
  "cartoes": [
      {
          "_id": "5cb579c9a9ebfa0dd1450a0b",
          "numero": "444",
          "nomePortador": "ROMULO L",
          "cvv": "111",
          "validade": "2020-10-01",
          "limite": 1100,
          "vencimento": "4",
          "__v": 0
      },
      {
        "_id": "5cb579c9a9ebfa0dd1450a0b",
        "numero": "666",
        "nomePortador": "ROMULO L",
        "cvv": "111",
        "validade": "2020-10-01",
        "limite": 1000,
        "vencimento": "4",
        "__v": 0
      },
      {
        "_id": "5cb579c9a9ebfa0dd1450a0b",
        "numero": "555",
        "nomePortador": "ROMULO L",
        "cvv": "111",
        "validade": "2020-10-01",
        "limite": 1000,
        "vencimento": "20",
        "__v": 0
    }
  ],
  "_id": "5cb578daf81fc10db9954d7f",
  "usuarioId": "5cb578b3f81fc10db9954d7e",
  "limite": 2000,
  "limiteDisponivel": 2000,
  "__v": 0
}


describe('BuyService test ', () => {
  it('get date close invoice', () => {
    const data = new Date()
    const MockModel = ''
    const buyService = BuyService(MockModel)
    const diaFatura = buyService.getDateCloseInvoice(data.getDate())

    expect(moment().subtract(1, 'months').format(`YYYY-MM-${data.getDate()}`)).toEqual(diaFatura)
  })

  it('ordenate cards with faraway invoice', () => {
    const data = new Date()
    const MockModel = ''
    let awnser = ''
    const buyService = BuyService(MockModel)
    const diaFatura = buyService.ordenateCardsWithFarawayInvoice(walletExample)
    data.getDate >= 20 ? awnser = [["2", 20], ["1", 4], ["0", 4]] : awnser = [ ["1", 4], ["0", 4], ["2", 20]]

    expect(awnser).toEqual(diaFatura)
  })

  it('save a buy', () => {
    const save = sinon.spy()
    const MockModel = function (data) {
      buy = data.buy
      return {
        ...data,
        save
      }
    }
    const buyService = BuyService(MockModel)
    buyService.makeBuy('new buy')
    expect(save.calledOnce).toEqual(true)
  })

  it('find buy from especific card', () => {
    const MockModel = {
      find: sinon.spy()
    }
    const buyService = BuyService(MockModel)
    buyService.getBuysFromEspecificCard('cartaoId', 'usuarioId')
    const actual = MockModel.find.calledOnce
    expect(actual).toEqual(true)
  })

  it('get all buys', () => {
    const MockModel = {
      find: sinon.spy()
    }
    const buyService = BuyService(MockModel)
    buyService.getAllBuys('usuarioId')
    const actual = MockModel.find.calledOnce
    expect(actual).toEqual(true)
  })

})
