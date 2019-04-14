const jwt = require('jsonwebtoken')

// const User = require('../user/userModel')

// eslint-disable-next-line arrow-body-style
const findUser = User => (email) => {
  return User.find({ email })
}

// eslint-disable-next-line no-unused-vars
const checkPasswordLogin = User => (user, passwordFromRequest) => {
  if (user[0] && user[0].password === passwordFromRequest) {
    const token = jwt.sign(user[0].toJSON(), 'aaaa', { expiresIn: '1 day' })
    const { name, email } = user[0]
    return { status: 200, message: { name, email, token } }
  }
  return { status: 400, message: 'usuario/senha invalidos' }
}

const validateLoginAndPassword = (email, password) => {
  const emailRegex = /\S+@\S+\.\S+/
  const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

  if (!email.match(emailRegex)) {
    return { status: 400, message: { message: 'O e-mail informa está inválido' } }
  }
  if (!password.match(passwordRegex)) {
    return { status: 400, message: { message: 'Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20.' } }
  }
  return null
}

const createNewUser = User => (nome, email, password) => {
  // const email = reqbody.email || ''
  // const password = reqbody.password || ''
  // const confirmPassword = reqbody.confirm_password || ''

  const maybe = validateLoginAndPassword(email, password)
  if (maybe) {
    return { status: maybe.status, message: maybe.message }
  }

  const newUser = new User({
    nome,
    email,
    password,
    nivelAcesso: 1,
  })
  return newUser.save()
}

module.exports = User => ({
  findUser: findUser(User),
  checkPasswordLogin: checkPasswordLogin(User),
  createNewUser: createNewUser(User),
})
