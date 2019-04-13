/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */

const moment = require('moment')

const Buy = require('./buyModel')

const Wallet = require('../wallet/walletModel')

exports.makeBuy = (req, res) => {
  function getDateCloseInvoice (diaa) {
    const data = new Date()
    if (data.getDate() > parseInt(diaa, 10)) {
      return moment().format(`YYYY-MM-${diaa}`)
    }
    return moment().subtract(1, 'months').format(`YYYY-MM-${diaa}`)
  }

  const dia = new Date()
  const hoje = dia.getDate()
  let cartaoComDataLonge = 0
  let indexComDataLonge = 0

  let arrayMaior = {}
  let arrayMenor = {}

  Wallet.findOne({
    // eslint-disable-next-line no-underscore-dangle
    usuarioId: req.decoded._id,
  }, (err, wallet) => {
    wallet.cartoes.forEach((cartao, index) => {
      // eslint-disable-next-line max-len
      if ((parseInt(cartao.vencimento, 10)) <= hoje) {
        arrayMenor[index] = parseInt(cartao.vencimento, 10)
        // cartaoComDataLonge = cartao.vencimento
        // indexCartaoComDataLonge = index
      } else if ((parseInt(cartao.vencimento, 10)) > hoje) {
        arrayMaior[index] = parseInt(cartao.vencimento, 10)
      }
    })
    // console.log(Object.entries(arrayMaior).length)
    // console.log(Object.entries(arrayMenor).length)
    if (Object.entries(arrayMenor).length === 0) {
      for (let i = 0; i < Object.entries(arrayMaior).length; i++) {
        if (arrayMaior[i] > cartaoComDataLonge) { // TROCA SE PA?
          cartaoComDataLonge = arrayMaior[i]
          indexComDataLonge = i
        }
      }
      for (let j = 0; j < Object.entries(arrayMaior).length; j++) {
        // eslint-disable-next-line eqeqeq
        if (cartaoComDataLonge == arrayMaior[j]) {
          // eslint-disable-next-line max-len
          if (wallet.cartoes[j].limite > wallet.cartoes[indexComDataLonge].limite) {
            cartaoComDataLonge = arrayMaior[j]
            indexComDataLonge = j
          }
        }
      }
    } else {
      // eslint-disable-next-line no-plusplus
      wallet.cartoes.forEach((cartao, i) => {
        if (arrayMenor[i] > cartaoComDataLonge) {
          cartaoComDataLonge = arrayMenor[i]
          indexComDataLonge = i
        }
      })
      console.log(arrayMenor)
      console.log(cartaoComDataLonge)
      // eslint-disable-next-line no-plusplus
      wallet.cartoes.forEach((cartao, j) => {
        // eslint-disable-next-line eqeqeq
        if (cartaoComDataLonge == arrayMenor[j]) {
          // eslint-disable-next-line max-len
          // console.log('db', wallet.cartoes[j].limite)
          // console.log('atual', wallet.cartoes[indexComDataLonge].limite)
          // eslint-disable-next-line max-len
          if (wallet.cartoes[j].limite < wallet.cartoes[indexComDataLonge].limite) {
            cartaoComDataLonge = arrayMenor[j]
            indexComDataLonge = j
          }
        }
      })
    }
    // console.log(wallet.cartoes[indexComDataLonge])

    Buy.find({
      // eslint-disable-next-line no-underscore-dangle
      cartaoId: wallet.cartoes[indexComDataLonge]._id,
      // eslint-disable-next-line no-underscore-dangle
      usuarioId: req.decoded._id
    }, (erro, compras) => {
      // eslint-disable-next-line consistent-return
      const totalCompras = compras.reduce((acumulador, compra) => {
        if (moment(compra.data).isAfter(getDateCloseInvoice(wallet.cartoes[indexComDataLonge].vencimento))) {
          return compra + acumulador
        }
      }, 0)

      if ((totalCompras + req.body.preco) > wallet.cartoes[indexComDataLonge].limite) {
        // sla o que vou fazer aqui
      } else {
        const newBuy = new Buy(req.body)
        newBuy.cartaoId = wallet.cartoes[indexComDataLonge]._id
        newBuy.usuarioId = req.decoded._id
        newBuy.save((errro) => {
          if (errro) {
            res.status(400)
            return res.send(errro.message)
          }
          res.status(201)
          return res.json({
            message: 'compra feita com sucesso',
          })
        })
      }
    })
    // console.log(getDateCloseInvoice(wallet.cartoes[indexComDataLonge].vencimento))
    // console.log(moment('2019-04-10').isAfter(getDateCloseInvoice(wallet.cartoes[indexComDataLonge].vencimento)))
  })

  // res.send('a')

  // const buy = new Buy(req.body)
  // buy.save((erro, compra) => {
  //   if (erro) {
  //     res.status(400)
  //     return res.send(erro.message)
  //   }
  //   return res.status(201).json(compra)
  // })
}

// function getDateCloseInvoice(dia) {
//   const data = new Date()

//   if (data.getDate() > parseInt(dia, 10)) {
//     console.log(moment().format(`YYYY-MM-${dia}`))
//   } else {
//     console.log(moment().subtract(1, 'months').format(`YYYY-MM-${dia}`))
//   }
// }
