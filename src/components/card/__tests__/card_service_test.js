const sinon = require('sinon')

const CardService = require('../cardService')

const walletWithOneCard = {
  "cartoes": [
      {
          "_id": "5caece4287786b0032d62829",
          "numero": "5555555555555555",
          "nomePortador": "ROMULO L",
          "cvv": "123",
          "validade": "2020-10-01",
          "limite": 2500,
          "vencimento": "2000-01-03",
          "__v": 0
      }
  ],
  "_id": "5caece3e87786b0032d62828",
  "usuarioId": "5caece2287786b0032d62827",
  "limite": 2500,
  "limiteDisponivel": 2500,
  "__v": 0
}

const walletWithTwoCards = {
  "cartoes": [
      {
          "_id": "5caece4287786b0032d62829",
          "numero": "5555555555555555",
          "nomePortador": "ROMULO L",
          "cvv": "123",
          "validade": "2020-10-01",
          "limite": 2500,
          "vencimento": "2000-01-03",
          "__v": 0
      },
      {
        "_id": "6caece4287786b0032d62829",
        "numero": "6666666666666666",
        "nomePortador": "ROMULO L",
        "cvv": "321",
        "validade": "2021-11-02",
        "limite": 2000,
        "vencimento": "15",
        "__v": 0
      }
  ],
  "_id": "5caece3e87786b0032d62828",
  "usuarioId": "5caece2287786b0032d62827",
  "limite": 4500,
  "limiteDisponivel": 4500,
  "__v": 0
}

const cardExample = {
  "_id": "6caece4287786b0032d62829",
  "numero": "6666666666666666",
  "nomePortador": "ROMULO L",
  "cvv": "321",
  "validade": "2021-11-02",
  "limite": 2000,
  "vencimento": "15",
  "__v": 0
}



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

describe('CardService unit test', () => {
  it('add card to wallet object', () => {
    const MockModel = ''
    const cardService = CardService(MockModel)
    const newWallet = cardService.addCardOnWallet(walletWithOneCard, cardExample)
    expect(newWallet).toEqual(walletWithTwoCards)
  })  
})

// describe('CardService unit test', () => {
//   it('remove card of wallet object', () => {
//     const MockModel = ''
//     const cardService = CardService(MockModel)
//     const newWallet = cardService.removeCardFromWallet(walletWithTwoCards, cardExample._id)
//     expect(newWallet).toEqual(walletWithOneCard)
//   })
// })