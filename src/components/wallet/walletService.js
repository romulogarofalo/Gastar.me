// eslint-disable-next-line arrow-body-style
const findWallet = Wallet => (usuarioId, nivelAcesso = 1) => {
  return (nivelAcesso === '2' ? Wallet.find({}) : Wallet.find({ usuarioId }))
}

const createNewWallet = Wallet => (usuarioId) => {
  // eslint-disable-next-line prefer-const
  let newWallet = new Wallet()

  newWallet.usuarioId = usuarioId
  newWallet.limite = 0
  newWallet.limiteDisponivel = 0

  return newWallet.save()
}

// eslint-disable-next-line arrow-body-style
const updateWallet = Wallet => (usuarioId, newWallet) => {
  return Wallet.updateOne({ usuarioId }, newWallet, { new: true })
}

// eslint-disable-next-line arrow-body-style
const deleteWallet = Wallet => (idWallet) => {
  return Wallet.deleteOne({ _id: idWallet })
}

module.exports = Wallet => ({
  findWallet: findWallet(Wallet),
  createNewWallet: createNewWallet(Wallet),
  updateWallet: updateWallet(Wallet),
  deleteWallet: deleteWallet(Wallet),
})
