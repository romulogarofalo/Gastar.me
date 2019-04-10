const { Router } = require('express')

// const auth = require('./auth')

const router = Router()

const middleWareAuth = require('./auth')

const authController = require('../components/auth/authController')

const cardController = require('../components/card/cardController')

const walletController = require('../components/wallet/walletController')

router.route('/login')
  .post(authController.login)

router.route('/signup')
  .post(authController.signup)

router.route('/cards')
  .get(middleWareAuth, cardController.getCards)
  .post(middleWareAuth, cardController.addCard)

router.route('/wallets')
  .post(middleWareAuth, walletController.addWallet)
  .get(middleWareAuth, walletController.getWallet)

module.exports = router
