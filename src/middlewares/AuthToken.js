const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth')

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.sendStatus(403)
  }

  const authorizationFields = authorization.split(' ')
  const [scheme, token] = authorizationFields

  if (authorizationFields.length !== 2 || scheme !== 'Bearer') {
    return res.sendStatus(401)
  }

  try {
    const decodedToken = jwt.verify(token, secret)
    req.headers.userId = decodedToken.id
    return next()
  } catch (error) {
    return res.sendStatus(403)
  }
}
