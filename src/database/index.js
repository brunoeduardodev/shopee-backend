const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Item = require('../models/Item')
const User = require('../models/User')
const Category = require('../models/Category')

const connection = new Sequelize(dbConfig)

Item.init(connection)
User.init(connection)
Category.init(connection)

Category.hasMany(Item, {
  foreignKey: {
    name: 'category_id',
    allowNull: true
  }
})

module.exports = connection
