const User = require('../models/User')
const generateToken = require('../util/generateToken')
const bcrypt = require('bcryptjs')

class AuthController {
  async auth (req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({
        where: {
          email
        }
      })
      const authorized = await bcrypt.compare(password, user.password_hash)

      console.log('Authorized: ', authorized)

      if (!authorized) {
        return res.sendStatus(401)
      }

      const token = generateToken(user.id)

      res.json({
        user,
        token
      })
    } catch (error) {
      console.log(error)
      res.sendStatus(400)
    }
  }
}

module.exports = AuthController
