const Wallet = require('./walletModel')

exports.addWallet = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  Wallet.findOne({ usuarioId: req.decoded._id }, (err, wallet) => {
    // se encontrar manda 409
    if (wallet) {
      return res.status(409).send({ errors: ['Wallet ja criada'] })
    }

    // eslint-disable-next-line prefer-const
    let newWallet = new Wallet()
    // eslint-disable-next-line no-underscore-dangle
    newWallet.usuarioId = req.decoded._id
    newWallet.limite = 0
    newWallet.limiteDisponivel = 0

    console.log(newWallet)
    return newWallet.save((erro) => {
      if (erro) {
        res.status(400)
        return res.send(erro.message)
      }
      res.status(201)
      return res.send('wallet created')
    })
  })
}

exports.getWallet = (req, res) => {
  Wallet.findOne({
    // eslint-disable-next-line no-underscore-dangle
    usuarioId: req.decoded._id,
  }, (err, wallet) => {
    if (!wallet) {
      return res.status(404).json('Nenhuma Wallet foi encontrada')
    }
    console.log(wallet)
    if (err) {
      return res.send(err.message)
    }
    return res.status(200).json(wallet)
  })
}
