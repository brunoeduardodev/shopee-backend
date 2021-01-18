const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth')

module.exports = function generateToken (id) {
  const token = jwt.sign(id, secret)
  return token
}
