const jwt = require('jsonwebtoken')

const User = require('../user/userModel')

exports.findUser = email => User.findOne({ email })

exports.checkPassword = (user, passwordFromRequest) => {
  if (user && user.password === passwordFromRequest) {
    const token = jwt.sign(user.toJSON(), 'aaaa', { expiresIn: '1 day' })
    const { name, email } = user
    return { status: 200, message: { name, email, token } }
  }
  return { status: 400, message: 'usuario/senha invalidos' }
}
