/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
const Card = require('./cardModel')

const Wallet = require('../wallet/walletModel')

const walletService = require('../wallet/walletService')(Wallet)

const cardService = require('./cardService')(Card)

exports.getCards = async (req, res) => {
  try {
    const userId = req.decoded._id
    const wallet = await walletService.findWallet(userId)
    if (wallet.length !== 0) { res.status(404).send({ message: 'Wallet nao encontrada, Crie uma!' }) }

    return res.status(200).send({ message: wallet[0].cartoes })
  } catch ({ message }) {
    return res.status(500).json(message)
  }
}

exports.addCard = async (req, res) => {
  try {
    const userId = req.decoded._id
    const oldWallet = await walletService.findWallet(userId)

    if (oldWallet[0].length === 0) { res.status(404).send({ message: 'Wallet nao encontrada, Crie uma!' }) }

    const newCard = await cardService.addCard(req.body)
    const newWallet = cardService.addCardOnWallet(oldWallet[0], newCard)
    const updatedWallet = await walletService.updateWallet(userId, newWallet)

    return res.status(201).send(updatedWallet)
  } catch ({ message }) {
    return res.status(500).json(message)
  }
}

exports.removeCard = async (req, res) => {
  try {
    const userId = req.decoded._id
    const wallet = await walletService.findWallet(userId)
    if (wallet.length === 0) { res.status(404).send({ message: 'Wallet nao encontrada, Crie uma!' }) }
    console.log(wallet[0])
    const walltListWithoutCard = cardService.removeCardFromWallet(
      wallet[0],
      req.body.idCartao
    )
    wallet.cartoes = walltListWithoutCard
    const updatedWallet = await walletService.updateWallet(userId, wallet)

    return res.status(204).send(updatedWallet)
  } catch ({ message }) {
    return res.status(500).json(message)
  }
}
