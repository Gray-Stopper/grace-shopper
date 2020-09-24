const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  subtotal: {
    type: Sequelize.INTEGER,
    get: function() {
      let pennies = this.getDataValue('subtotal')
      return pennies / 100
    }
  }
})

module.exports = Order
