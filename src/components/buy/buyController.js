/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */

const Buy = require('./buyModel')

const Wallet = require('../wallet/walletModel')

const buyService = require('./buyService')(Buy)

const walletService = require('../wallet/walletService')(Wallet)

exports.makeBuy = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const wallet = await walletService.findWallet(req.decoded._id)

    const ordenadListCardsToBuy = buyService.ordenateCardsWithFarawayInvoice(wallet[0])

    const allBuys = await buyService.getAllBuys(req.decoded._id)

    const listBuy = buyService.makeListBuy(wallet[0], ordenadListCardsToBuy, req.body, req.decoded._id, allBuys)

    listBuy.map(async (buy) => {
      await buy.buyService.makeBuy(buy)
    })

    return res.status(201).json('compra feita com sucesso')
  } catch ({ message }) {
    return res.status(500).json(message)
  }
}
