const { Schema, model } = require('mongoose')

const CardSchema = new Schema({
  numero: {
    type: String,
    required: true,
    unique: false,
  },
  nomePortador: {
    type: String,
    required: true,
    unique: false,
  },
  cvv: {
    type: String,
    required: true,
    unique: false,
  },
  validade: {
    type: String,
    required: true,
    unique: false,
  },
  limite: {
    type: Number,
    required: true,
    unique: false,
  },
  vencimento: {
    type: String,
    required: true,
    unique: false,
  },
})

module.exports = model('Card', CardSchema)
