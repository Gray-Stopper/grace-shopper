const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
    validate: {
      min: 0
    }
  },
  description: Sequelize.TEXT,
  price: Sequelize.DECIMAL,
  category: Sequelize.ENUM('color', 'nutrition', 'wigs')
})

module.exports = Product
