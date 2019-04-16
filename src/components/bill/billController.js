const Bill = require('./billModel')

const Buy = require('../buy/buyModel')

const Wallet = require('../wallet/walletModel')

const billService = require('./billService')(Bill)

const buyService = require('../buy/buyService')(Buy)

const walletService = require('../wallet/walletService')(Wallet)

exports.getAmountToPayBill = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const userId = req.decoded._id

    const wallet = await walletService.findWallet(userId)

    const allBuys = await buyService.getAllBuys(userId)

    const paymants = await billService.getAllBillsPayed(userId)

    // eslint-disable-next-line max-len
    const whatNeedToPay = billService.getAmountToPay(wallet[0], allBuys, paymants)

    return res.status(200).json({ message: whatNeedToPay })
  } catch ({ message }) {
    return res.status(500).json({ message })
  }
}

exports.payBill = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const userId = req.decoded._id

    const wallet = await walletService.findWallet(userId)

    const allBuys = await buyService.getAllBuys(userId)

    const paymants = await billService.getAllBills(userId)

    // eslint-disable-next-line max-len
    const whatNeedToPay = billService.getAmountToPay(wallet[0], allBuys, paymants)

    if (req.body.valor > whatNeedToPay) {
      return res.status(400).send({ message: 'valor maior do que a fatura!' })
    }
    const payed = await billService.makeThePayment({
      usuarioId: userId,
      data: req.body.data,
      valor: req.body.valor,
    })
    return res.status(201).send({ message: payed })
  } catch ({ message }) {
    return res.status(500).json({ message })
  }
}
