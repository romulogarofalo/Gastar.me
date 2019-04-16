const { Schema, model } = require('mongoose')

const BillSchema = new Schema({
  usuarioId: {
    type: String,
    required: true,
    unique: false,
  },
  data: {
    type: String,
    required: true,
    unique: false,
  },
  valor: {
    type: Number,
    required: true,
    unique: false,
  },
})

module.exports = model('Bill', BillSchema)
