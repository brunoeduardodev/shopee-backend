const bcrypt = require('bcryptjs')
const User = require('../models/User')

class UserController {
  async index (req, res) {
    const users = await User.findAll()
    res.json(users)
  }

  async store (req, res) {
    try {
      const password = req.body.password
      // eslint-disable-next-line camelcase
      const passwordHash = await bcrypt.hash(password, 10)
      const user = await User.create({ ...req.body, password_hash: passwordHash })
      res.json(user)
    } catch (err) {
      console.log(err)
      res.sendStatus(400)
    }
  }

  async update (req, res) {
    const { id } = req.params

    const newUserData = req.body
    console.log(id)
    console.log(newUserData)
    try {
      await User.update(newUserData, { where: { id } })
      const user = await User.findOne({ where: { id } })
      res.json(user)
    } catch (error) {
      console.log(error)
      res.sendStatus(400)
    }
  }

  async delete (req, res) {
    const { id } = req.params
    try {
      User.destroy({ where: { id } })
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.sendStatus(400)
    }
  }
}

module.exports = UserController
