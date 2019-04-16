const moment = require('moment')

const getDateCloseInvoice = Buy => (dia) => {
  const data = new Date()
  if (data.getDate() > parseInt(dia, 10)) {
    return moment().format(`YYYY-MM-${dia}`)
  }
  return moment().subtract(1, 'months').format(`YYYY-MM-${dia}`)
}

const sortCards = (objectWithCards) => {
  let sortable = []
  for (var index in objectWithCards) {
      sortable.push([index, objectWithCards[index]])
  }
  return sortable.sort(function(a, b) {
      return a[1] - b[1]
  })
}

const ordenateCardsWithFarawayInvoice = Buy => (wallet) => {
  const hoje = 10
  let arrayMaior = {}
  let arrayMenor = {}

  wallet.cartoes.forEach((cartao, index) => {
    if ((parseInt(cartao.vencimento, 10)) <= hoje) {
      arrayMenor[index] = parseInt(cartao.vencimento, 10)
    } else if ((parseInt(cartao.vencimento, 10)) > hoje) {
      arrayMaior[index] = parseInt(cartao.vencimento, 10)
    }
  })

  // eslint-disable-next-line max-len
  const listCardsSorted = sortCards(arrayMenor).concat(sortCards(arrayMaior).reverse())

  return findEqualPayDate(listCardsSorted, wallet.cartoes)
}

const getCardFromList = (Buy) => (wallet, list, index) => {
  return wallet.cartoes[list[index][0]]
}

const findEqualPayDate = (arraySortido, cartoes, valorDaCompra) => {
  for (let indexFreeze = 0; indexFreeze < arraySortido.length; indexFreeze++) {
    arraySortido.forEach((arrayCartaoSortido, index) => {
      if (indexFreeze < index) {
        if (arraySortido[indexFreeze][1] === arrayCartaoSortido[1]) {        
          if(cartoes[arraySortido[indexFreeze][0]].limite > cartoes[arrayCartaoSortido[0]].limite) {
            aux1 = arraySortido[indexFreeze]
            arraySortido[indexFreeze] = arrayCartaoSortido
            arraySortido[index] = aux1
          }
        }
      }
    })
  }
  return arraySortido
}

const getLimitAvalibleCard = (buysWithCard, card) => { // ISSO TA ERRRADO
  const dia = new Date()
  const hoje = dia.getDate()
  let dataLastFatura = ''
  if (card.vencimento < hoje) {
    dataLastFatura = `${dia.getFullYear()}-${(dia.getMonth()+1)}-${card.vencimento}`
  } else {
    dataLastFatura = `${dia.getFullYear()}-${(dia.getMonth()+2)}-${card.vencimento}`
  }

  const compras = buysWithCard.filter((buy) => {
    if(moment(buy.data).isAfter(dataLastFatura)) {
      return buy
    }
  })

  const sumBuys = compras.reduce((acumulador, compra) => {
    if (moment(compra.data).isAfter(getDateCloseInvoice(wallet.cartoes[indexComDataLonge].vencimento))) {
      return (compra + acumulador)
    }
  }, 0)

  return (card.limite - sumBuys)
}

const getBuysFromEspecificCard = Buy => (cartaoId, usuarioId) => {
  return Buy.find({ cartaoId, usuarioId })
}

const getAllBuys = Buy => (usuarioId) => {
  return Buy.find({ usuarioId })
}

const makeListBuy = Buy => (wallet, sortedListCards, buy, usuarioId, allBuys) => {
  buyList = []
  let i = 0;
  while (buy.preco > 0) {
    const buyOfCard = allBuys.filter((buy) => {
      if(buy.cartaoId === getCardFromList()(wallet, sortedListCards, i)._id){
        return buy
      }
    })
    const card = getCardFromList()(wallet, sortedListCards, i)

    limitAvaliable = getLimitAvalibleCard(buyOfCard, card)

    if(limitAvaliable > buy.preco) {
      buyList.push({
        usuarioId,
        cartaoId: card._id,
        preco: buy.preco,
        data: buy.data
      })
      buy.preco = buy.preco - limitAvaliable
    } else {
      if(limitAvaliable > 0 ) { 
        
      } else {
        buy.preco = buy.preco - limitAvaliable
        buyList.push({
          usuarioId,
          cartaoId: card._id,
          preco: buy.preco,
          data: buy.data
        })
      }
    }
  }
  return buyList
}

const makeBuy = Buy => (buy) => {
  const newBuy = new Buy(buy)
  return newBuy.save()
}

module.exports = Buy => ({
  ordenateCardsWithFarawayInvoice: ordenateCardsWithFarawayInvoice(Buy),
  getBuysFromEspecificCard: getBuysFromEspecificCard(Buy),
  getCardFromList: getCardFromList(Buy),
  makeListBuy: makeListBuy(Buy),
  getAllBuys: getAllBuys(Buy),
  makeBuy: makeBuy(Buy)
})
