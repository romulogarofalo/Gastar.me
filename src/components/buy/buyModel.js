const { Schema, model } = require('mongoose')

const BuySchema = new Schema({
  usuarioId: {
    type: String,
    required: true,
    unique: false,
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
})

module.exports = model('Buy', BuySchema)
