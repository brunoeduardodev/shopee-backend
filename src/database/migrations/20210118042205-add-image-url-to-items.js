'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('items', 'image_url', { type: Sequelize.STRING, allowNull: false })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('items', 'image_url')
  }
}
