/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */

const addCard = Card => (reqBody) => {
  const newCard = new Card(reqBody)
  return newCard.save()
}

// eslint-disable-next-line no-unused-vars
const addCardOnWallet = Card => (wallet, card) => { // UNITARIO
  const oldWallet = wallet
  oldWallet.cartoes.push(card)
  oldWallet.limite += card.limite
  oldWallet.limiteDisponivel += card.limite

  return oldWallet
}

// eslint-disable-next-line no-unused-vars
const removeCardFromWallet = Card => (wallet, idCard) => { // UNITARIO
  const walletWithOutCard = wallet
  // eslint-disable-next-line array-callback-return
  const walltListCard = wallet.cartoes.filter((cartao) => {
    if (String(cartao._id) !== idCard) {
      return cartao
    }
    walletWithOutCard.limite -= cartao.limite
    walletWithOutCard.limiteDisponivel -= cartao.limite
  })

  return walltListCard
}

module.exports = Card => ({
  addCard: addCard(Card),
  addCardOnWallet: addCardOnWallet(Card),
  removeCardFromWallet: removeCardFromWallet(Card),
})
