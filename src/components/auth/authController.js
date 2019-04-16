const jwt = require('jsonwebtoken')

const User = require('../user/userModel')

const authService = require('./authService')(User)

exports.login = async (req, res) => {
  const email = req.body.email || ''
  const password = req.body.password || ''

  try {
    const user = await authService.findUser(email)
    const { status, message } = authService.checkPasswordLogin(user, password)
    res.status(status).json(message)
  } catch ({ message }) {
    res.status(500).json(message)
  }
}

// COLOCAR ISSO DENTRO DE UM MIDDLEWARE? ///////////////////////////////////////////////
// eslint-disable-next-line no-unused-vars
exports.validateToken = (req, res, next) => {
  const token = req.body.token || ''
  // eslint-disable-next-line no-unused-vars
  jwt.verify(token, 'aqui vai o segredo do .env', (err, decoded) => {
    res.status(200).send({ valid: !err })
  })
}

// eslint-disable-next-line no-unused-vars
exports.signup = async (req, res, next) => {
  try {
    const {
      nome,
      email,
      password,
      nivelAcesso,
    } = req.body

    const user = await authService.findUser(email)
    if (user.length !== 0) return res.status(409).send({ message: 'usuario ja cadastrado' })

    // eslint-disable-next-line max-len
    const newUser = await authService.createNewUser(nome, email, password, nivelAcesso)

    if (newUser.message && newUser.status) {
      return res.status(newUser.status).json(newUser.message)
    }

    return res.status(201).send({ message: 'Usuario criado com sucesso!' })
  } catch ({ message }) {
    return res.status(500).json(message)
  }
}

