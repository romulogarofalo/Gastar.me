const jwt = require('jsonwebtoken')

const User = require('../user/userModel')

const emailRegex = /\S+@\S+\.\S+/

// const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

exports.login = (req, res) => {
  const email = req.body.email || ''
  const password = req.body.password || ''

  return User.findOne({ email }, (err, user) => {
    if (err) {
      return res.send(err)
    } if (user && password === user.password) {
      const token = jwt.sign(user.toJSON(), 'aaaa', { expiresIn: '1 day' })
      // eslint-disable-next-line no-shadow
      const { name, email } = user
      return res.json({ name, email, token })
    }
    return res.status(400).send({ errors: ['usuario/senha invalidos'] })
  })
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

  if (!email.match(emailRegex)) {
    return res.status(400).send({ errors: ['O e-mail informa está inválido'] })
  }

  // if (!password.match(passwordRegex)) {
  //   return res.status(400).send({ errors: ['Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20.'] })
  // }

  if (confirmPassword === password) {
    return res.status(400).send({ errors: ['Senhas não conferem.'] })
  }
  console.log(email)
  return User.findOne({ email }, (err, user) => {
    console.log(user)
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

