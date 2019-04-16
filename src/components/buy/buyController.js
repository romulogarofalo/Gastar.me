/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */

const Buy = require('./buyModel')

const Wallet = require('../wallet/walletModel')

const Bill = require('../bill/billModel')

const buyService = require('./buyService')(Buy)

const walletService = require('../wallet/walletService')(Wallet)

const billService = require('../bill/billService')(Bill)

exports.makeBuy = async (req, res) => {
  try {
    const userId = req.decoded._id
    // eslint-disable-next-line no-underscore-dangle
    const wallet = await walletService.findWallet(userId)

    const ordenadListCardsToBuy = buyService.ordenateCardsWithFarawayInvoice(wallet[0])

    const allBuys = await buyService.getAllBuys(req.decoded._id)

    const paymants = await billService.getAllBillsPayed(userId)

    const whatNeedToPay = billService.getAmountToPay(wallet[0], allBuys, paymants)
    if((parseFloat(wallet[0].limiteDisponivel) - whatNeedToPay ) < parseFloat(req.body.preco)) {
      return res.status(400).json({ message: 'você não tem limite disponivel' })
    }

    const listBuy = buyService.makeListBuy(wallet[0], ordenadListCardsToBuy, req.body, req.decoded._id, allBuys)
    console.log(listBuy)
    listBuy.map(async (buy) => {
      await buyService.makeBuy(buy)
    })

    return res.status(201).json({ message: 'compra feita com sucesso' })
  } catch ({ message }) {
    return res.status(500).json(message)
  }
}
