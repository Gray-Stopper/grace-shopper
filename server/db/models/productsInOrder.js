const Sequelize = require('sequelize')
const db = require('../db')

const ProductsInOrder = db.define('productsInOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    },
    defaultValue: 1
  }
})

module.exports = ProductsInOrder
