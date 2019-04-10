const { Schema, model } = require('mongoose')

const WalletSchema = new Schema({
  usuarioId: {
    type: String,
    required: true,
    unique: true,
  },
  cartoes: {
    type: [],
    required: false,
    unique: false,
  },
  limite: {
    type: Number,
    required: false,
    unique: false,
  },
  limiteDisponivel: {
    type: Number,
    required: true,
    unique: false,
  },
})

module.exports = model('Wallet', WalletSchema)
