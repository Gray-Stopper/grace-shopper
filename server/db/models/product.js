const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: Sequelize.STRING,
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.kindpng.com/picc/m/94-942827_grandma-wig-clip-art-wig-clip-art-hd.png'
    // defaultValue: 'public/favicon.ico.png'
  },
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
