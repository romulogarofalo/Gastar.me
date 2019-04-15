const { Schema, model } = require('mongoose')

const BuySchema = new Schema({
  usuarioId: {
    type: String,
    required: true,
    unique: true,
  },
  cartaoId: {
    type: String,
    required: false,
    unique: false,
  },
  preco: {
    type: Number,
    required: false,
    unique: false,
  },
  data: {
    type: String,
    required: true,
    unique: false,
  },
  paga: {
    type: Boolean,
    required: false,
    default: false,
  },
})

module.exports = model('Buy', BuySchema)
