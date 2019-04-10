const jwt = require('jsonwebtoken')

// const env = require('../.env')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  } else {
    // eslint-disable-next-line dot-notation
    const token = req.body.token || req.query.token || req.headers['authorization']

    if (!token) {
      res.status(403).send({ errors: ['no token provided'] })
    }

    jwt.verify(token, 'aaaa', (err, decoded) => {
      if (err) {
        res.status(403).send({ errors: ['failed to authenticate token'] })
      } else {
        req.decoded = decoded
        next()
      }
    })
  }
}
