/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */

const moment = require('moment')

const getDateOpenDayBill = Bill => (diaVencimentoCartao) => {
  const dia = new Date()
  const hoje = dia.getDate()

  if (diaVencimentoCartao < hoje) {
    return `${dia.getFullYear()}-${(dia.getMonth() + 1)}-${diaVencimentoCartao}`
  }
  return `${dia.getFullYear()}-${(dia.getMonth() + 2)}-${diaVencimentoCartao}`
}

const getAmountToPay = Bill => (wallet, buys, payments) => {
  let amountBill = 0
  let amountPayment = 0
  wallet.cartoes.forEach((card) => { // da pra trocar pra reduce se pa
    amountBill += buys.reduce((acumulador, buy) => {
      // eslint-disable-next-line max-len
      if (buy.cartaoId === card._id && moment(getDateOpenDayBill(card.vencimento)).isBefore(buy.data)) {
        return acumulador + parseFloat(buy.preco)
      }
      return acumulador + 0
    }, 0)

    amountPayment += payments.reduce((sum, payment) => {
      if (moment(getDateOpenDayBill(card.vencimento)).isBefore(payment.data)) {
        return sum + parseFloat(payment.preco)
      }
      return sum + 0
    }, 0)
  })

  return amountBill - amountPayment
}

const makeThePayment = Bill => (bill) => {
  const newBill = new Bill(bill)
  return newBill.save()
}

// eslint-disable-next-line arrow-body-style
const getAllBillsPayed = Bill => (usuarioId) => {
  return Bill.find({ usuarioId })
}

module.exports = Bill => ({
  getAmountToPay: getAmountToPay(Bill),
  makeThePayment: makeThePayment(Bill),
  getAllBillsPayed: getAllBillsPayed(Bill),
})

