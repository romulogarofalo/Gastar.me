const { Router } = require('express')

// const auth = require('./auth')

const router = Router()

const middleWareAuth = require('./auth')

const authController = require('../components/auth/authController')

const cardController = require('../components/card/cardController')

const walletController = require('../components/wallet/walletController')

const buyController = require('../components/buy/buyController')

const billController = require('../components/bill/billController')

router.route('/login')
  .post(authController.login)

router.route('/signup')
  .post(authController.signup)

router.route('/cards')
  .get(middleWareAuth, cardController.getCards)
  .post(middleWareAuth, cardController.addCard)
  .delete(middleWareAuth, cardController.removeCard)

router.route('/wallets')
  .post(middleWareAuth, walletController.addWallet)
  .get(middleWareAuth, walletController.getWallet)
  .delete(middleWareAuth, walletController.deleteWallet)

router.route('/buy')
  .post(middleWareAuth, buyController.makeBuy)

router.route('/bill')
  .get(middleWareAuth, billController.getAmountToPayBill)
  .post(middleWareAuth, billController.payBill)

module.exports = router
