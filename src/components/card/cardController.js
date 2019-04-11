/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
const Card = require('./cardModel')

const Wallet = require('../wallet/walletModel')

exports.getCards = (req, res) => {
  console.log(req.decoded)
  // eslint-disable-next-line no-underscore-dangle
  Wallet.findOne({ usuarioId: req.decoded._id }, (err, wallet) => {
    if (err) {
      return res.json(err.message)
    }
    if (!wallet) {
      return res.status(404).json('nenhuma wallet encontrada')
    }
    res.status(200)
    return res.json(wallet.cartoes)
  })
}

// eslint-disable-next-line consistent-return
exports.addCard = (req, res) => {
  const card = new Card(req.body)
  // eslint-disable-next-line consistent-return
  card.save((erro, cartao) => {
    if (erro) {
      res.status(400)
      return res.send(erro.message)
    }

    Wallet.findOne({
      // eslint-disable-next-line no-underscore-dangle
      usuarioId: req.decoded._id,
    }, (err, wallet) => {
      if (!wallet) {
        return res.status(404).json('Você precisa criar uma wallet antes de criar cartoes')
      }
      console.log(wallet)
      if (err) {
        return res.send(err.message)
      }
      // eslint-disable-next-line prefer-const
      let oldWallet = wallet
      oldWallet.cartoes.push(cartao)
      oldWallet.limite += cartao.limite
      oldWallet.limiteDisponivel += cartao.limite
      console.log(oldWallet)

      return Wallet.update(
        // eslint-disable-next-line no-underscore-dangle
        { usuarioId: req.decoded._id },
        oldWallet, { new: true },
        (er, wallet2) => {
          if (er) return res.status(500).send(er)
          return res.status(204).send(wallet2)
        }
      )
    })
  })
}

exports.removeCard = (req, res) => {
  Wallet.findOne({
    usuarioId: req.decoded._id,
  }, (err, wallet) => {
    let walletWithOutCard = wallet
    const newWallet = wallet.cartoes.filter((cartao) => {
      if (String(cartao._id) !== req.body.idCartao) {
        return cartao
      }
      walletWithOutCard.limite -= cartao.limite
      walletWithOutCard.limiteDisponivel -= cartao.limite
    })
    walletWithOutCard.cartoes = newWallet
    console.log(walletWithOutCard)
    Wallet.update(
      { usuarioId: req.decoded._id },
      walletWithOutCard, { new: true },
      (erro, wallet2) => {
        if (erro) return res.status(500).send(erro)
        return res.status(204).send(wallet2)
      }
    )
  })
}

