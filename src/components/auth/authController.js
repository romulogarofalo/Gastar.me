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
    const { nome, email, password } = req.body

    const user = await authService.findUser(email)
    if (user.length !== 0) return res.status(409).send({ message: 'usuario ja cadastrado' })

    const newUser = await authService.createNewUser(nome, email, password)

    if (newUser.message && newUser.status) {
      return res.status(newUser.status).json(newUser.message)
    }

    return res.status(201).send('Usuario criado com sucesso!')
  } catch ({ message }) {
    return res.status(500).json(message)
  }

  // return User.findOne({ email }, (err, user) => {
  //   if (err) {
  //     return res.send(err)
  //   } if (user) {
  //     return res.status(409).send({ errors: ['usuario ja cadastrado'] })
  //   }

  //   const newUser = new User(req.body)
  //   return newUser.save((erro) => {
  //     if (erro) {
  //       res.status(400)
  //       return res.send(erro.message)
  //     }
  //     res.status(201)
  //     return res.json({
  //       message: 'User succesfully created',
  //     })
  //   })
  // })
}

