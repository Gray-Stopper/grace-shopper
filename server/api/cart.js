const router = require('express').Router()
const {ProductsInOrder, Order} = require('../db/models')
module.exports = router

// look up cart on log in
router.get('/:userId', async (req, res, next) => {
  try {
    console.log('req.params.userId: ', req.params.userId)
    const currentCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        completed: false
      }
    })
    if (currentCart) {
      const productsInCart = await ProductsInOrder.findAll({
        where: {
          orderId: currentCart.id
        }
      })
      res.json(productsInCart)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})
