const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const ProductsInOrder = require('./productsInOrder')

Order.belongsToMany(Product, {through: ProductsInOrder})
Product.belongsToMany(Order, {through: ProductsInOrder})
User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  User,
  Product,
  Order,
  ProductsInOrder
}
