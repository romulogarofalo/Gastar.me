const Wallet = require('./walletModel')

const walletService = require('./walletService')(Wallet)

exports.addWallet = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const userId = req.decoded._id
    const user = await walletService.findWallet(userId)
    if (user.length !== 0) return res.status(409).send({ message: 'Wallet ja criada' })

    await walletService.createNewWallet(userId)

    return res.status(201).send({ message: 'Wallet criada com sucesso!' })
  } catch ({ message }) {
    return res.status(500).json(message)
  }
}

exports.getWallet = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const userId = req.decoded._id
    // eslint-disable-next-line max-len
    const wallet = await walletService.findWallet(userId, req.decoded.nivelAcesso)

    console.log(wallet)

    if (wallet.length === 0) { res.status(404).send({ message: 'Wallet nao encontrada, Crie uma!' }) }

    return res.status(200).send({ message: wallet })
  } catch ({ message }) {
    return res.status(500).json(message)
  }
}

exports.deleteWallet = async (req, res) => {
  try {
    if (req.decoded.nivelAcesso === '2') {
      await walletService.deleteWallet(req.body.idWallet)
      return res.status(204).json('no content')
    }
    return res.status(403).json('no content')
  } catch ({ message }) {
    return res.status(500).json(message)
  }
}
