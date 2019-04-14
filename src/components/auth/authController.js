const jwt = require('jsonwebtoken')

const User = require('../user/userModel')

const authService = require('./authService')
// const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

exports.login = async (req, res) => {
  const email = req.body.email || ''
  const password = req.body.password || ''

  try {
    const user = await authService.findUser(email)
    const { status, message } = authService.checkPassword(user, password)
    res.status(status).json(message)
  } catch ({ message }) {
    res.status(500).json(message)
  }
}

// eslint-disable-next-line no-unused-vars
exports.validateToken = (req, res, next) => {
  const token = req.body.token || ''
  // eslint-disable-next-line no-unused-vars
  jwt.verify(token, 'aqui vai o segredo do .env', (err, decoded) => {
    res.status(200).send({ valid: !err })
  })
}

// eslint-disable-next-line no-unused-vars
exports.signup = (req, res, next) => {
  const email = req.body.email || ''
  const password = req.body.password || ''
  const confirmPassword = req.body.confirm_password || ''

  // eslint-disable-next-line no-undef
  // if (!email.match(emailRegex)) {
  //   return res.status(400).send({ errors: ['O e-mail informa está inválido'] })
  // }

  // if (!password.match(passwordRegex)) {
  //   return res.status(400).send({ errors: ['Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20.'] })
  // }

  if (confirmPassword === password) {
    return res.status(400).send({ errors: ['Senhas não conferem.'] })
  }
  return User.findOne({ email }, (err, user) => {
    if (err) {
      return res.send(err)
    } if (user) {
      return res.status(409).send({ errors: ['usuario ja cadastrado'] })
    }

    const newUser = new User(req.body)
    return newUser.save((erro) => {
      if (erro) {
        res.status(400)
        return res.send(erro.message)
      }
      res.status(201)
      return res.json({
        message: 'User succesfully created',
      })
    })
  })
}

