// eslint-disable-next-line arrow-body-style
const findWallet = Wallet => (usuarioId) => {
  return Wallet.find({ usuarioId })
}

const createNewWallet = Wallet => (usuarioId) => {
  // eslint-disable-next-line prefer-const
  let newWallet = new Wallet()

  newWallet.usuarioId = usuarioId
  newWallet.limite = 0
  newWallet.limiteDisponivel = 0

  return newWallet.save()
}

module.exports = Wallet => ({
  findWallet: findWallet(Wallet),
  createNewWallet: createNewWallet(Wallet),
})
