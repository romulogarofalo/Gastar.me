const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  nome: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  nivelAcesso: {
    type: String,
    required: true,
    unique: false,
  },
})

module.exports = model('User', UserSchema)
