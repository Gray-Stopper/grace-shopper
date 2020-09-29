const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: Sequelize.STRING,
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.kindpng.com/picc/m/94-942827_grandma-wig-clip-art-wig-clip-art-hd.png'
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
    validate: {
      min: 0
    }
  },
  description: Sequelize.STRING,
  price: {
    type: Sequelize.INTEGER,
    get: function() {
      let pennies = this.getDataValue('price')
      return pennies / 100
    }
  },
  category: Sequelize.ENUM('color', 'nutrition', 'wigs')
})

module.exports = Product
