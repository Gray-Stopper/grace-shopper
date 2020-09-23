const router = require('express').Router()
const {ProductsInOrder, Order, Product} = require('../db/models')
module.exports = router

// look up cart on log in
router.get('/:userId', async (req, res, next) => {
  try {
    console.log('req.params.userId: ', req.params.userId)
    const currentCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        completed: false
      },
      include: {model: Product, as: ProductsInOrder}
    })
    console.log(currentCart)
    if (currentCart) {
      res.json(currentCart)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})
