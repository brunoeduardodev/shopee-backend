const { Model, DataTypes } = require('sequelize')

class Item extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      value: DataTypes.FLOAT,
      category_id: DataTypes.INTEGER
    }, { sequelize })
  }
}

module.exports = Item
