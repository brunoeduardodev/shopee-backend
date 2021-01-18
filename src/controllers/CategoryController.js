const Category = require('../models/Category')
const Item = require('../models/Item')
class CategoryController {
  async index (req, res) {
    const categories = await Category.findAll({
      include: [Item]
    })

    res.json(categories)
  }

  async store (req, res) {
    try {
      const category = await Category.create(req.body)
      res.json(category)
    } catch (err) {
      res.sendStatus(400)
    }
  }

  async update (req, res) {
    const { id } = req.params

    const newCategoryData = req.body
    console.log(id)
    console.log(newCategoryData)
    try {
      await Category.update(newCategoryData, { where: { id } })
      const category = await Category.findOne({ where: { id } })
      res.json(category)
    } catch (error) {
      console.log(error)
      res.sendStatus(400)
    }
  }

  async delete (req, res) {
    const { id } = req.params
    try {
      Category.destroy({ where: { id } })
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.sendStatus(400)
    }
  }
}

module.exports = CategoryController
