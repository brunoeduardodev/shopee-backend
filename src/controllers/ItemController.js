const Item = require('../models/Item')
const fs = require('fs')
const path = require('path')

class ItemController {
  async index (req, res) {
    const items = await Item.findAll()
    res.json(items)
  }

  async store (req, res) {
    try {
      // eslint-disable-next-line camelcase
      const image_url = 'uploads/' + req.file.filename
      console.log('Image url: ', image_url)
      const item = await Item.create({ ...req.body, image_url: image_url })
      res.json(item)
    } catch (err) {
      console.log('Error: ', err)
      res.sendStatus(400)
    }
  }

  async update (req, res) {
    const { id } = req.params

    const newItemData = req.body
    if (req.file) {
      const item = await Item.findOne({ where: { id } })

      fs.unlinkSync(path.resolve(__dirname, '..', '..', item.image_url))
      newItemData.image_url = 'uploads/' + req.file.filename
    }

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
    const item = await Item.findOne({ where: { id } })

    fs.unlinkSync(path.resolve(__dirname, '..', '..', item.image_url))
    try {
      await Item.destroy({ where: { id } })
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.sendStatus(400)
    }
  }
}

module.exports = ItemController
