'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('items', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('items', 'category_id')
  }
}
