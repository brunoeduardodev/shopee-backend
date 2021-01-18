const Item = require('../models/Item')

class ItemController {
  async index (req, res) {
    const items = await Item.findAll()
    res.json(items)
  }

  async store (req, res) {
    try {
      const item = await Item.create(req.body)
      res.json(item)
    } catch (err) {
      res.sendStatus(400)
    }
  }

  async update (req, res) {
    const { id } = req.params

    const newItemData = req.body
    console.log(id)
    console.log(newItemData)
    try {
      await Item.update(newItemData, { where: { id } })
      const item = await Item.findOne({ where: { id } })
      res.json(item)
    } catch (error) {
      console.log(error)
      res.sendStatus(400)
    }
  }

  async delete (req, res) {
    const { id } = req.params
    try {
      Item.destroy({ where: { id } })
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.sendStatus(400)
    }
  }
}

module.exports = ItemController
