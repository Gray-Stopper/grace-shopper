const router = require('express').Router()
const {ProductsInOrder, Order, Product} = require('../db/models')
module.exports = router

// look up cart on log in
router.get('/:userId', async (req, res, next) => {
  try {
    const currentCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        completed: false
      },
      include: {model: Product, as: ProductsInOrder}
    })
    if (currentCart) {
      res.json(currentCart)
    } else {
      throw new Error()
    }
  } catch (err) {
    next(err)
  }
})

// remove item from cart
router.put('/remove', async (req, res, next) => {
  try {
    const currentOrder = await Order.findByPk(req.body.orderId)
    if (currentOrder.userId !== req.body.userId) {
      res.sendStatus(401)
    } else {
      await ProductsInOrder.destroy({
        where: {
          productId: req.body.productId,
          orderId: req.body.orderId
        }
      })
    }
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

// edit quantity of an item
router.put('/quantity', async (req, res, next) => {
  try {
    const currentOrder = await Order.findByPk(req.body.orderId)
    console.log('currentOrder: ', currentOrder)
    if (currentOrder.userId !== req.body.userId) {
      res.sendStatus(401)
    }
    const [numRows] = await ProductsInOrder.update(
      {quantity: req.body.quantity},
      {
        where: {
          orderId: req.body.orderId,
          productId: req.body.productId
        },
        returning: true
      }
    )
    if (numRows === 1) {
      res.json({
        quantity: req.body.quantity,
        productId: req.body.productId
      })
    } else if (numRows > 1) {
      throw new Error('updated too many rows!')
    } else throw new Error('update failed')
  } catch (err) {
    next(err)
  }
})

// add item to cart
router.put('/add', async (req, res, next) => {
  try {
    const [currentOrder] = await Order.findOrCreate({
      where: {
        completed: false,
        userId: req.body.userId
      },
      include: {
        model: Product,
        as: ProductsInOrder
      }
    })

    if (currentOrder.userId !== req.body.userId) {
      res.sendStatus(401)
    } else {
      let updatedProduct
      if (currentOrder.products) {
        currentOrder.products.forEach(async product => {
          if (product.id === req.body.productId) {
            const newQuantity = (product.productsInOrder.quantity += 1)
            const productToUpdate = await ProductsInOrder.findOne({
              where: {
                productId: req.body.productId,
                orderId: currentOrder.id
              }
            })
            updatedProduct = await productToUpdate.update({
              quantity: newQuantity
            })
          }
        })
      }
      if (!updatedProduct) {
        const currentProduct = await Product.findByPk(req.body.productId)
        await currentOrder.addProduct(currentProduct)
      }
      let updatedOrder = await Order.findOne({
        where: {
          userId: req.body.userId,
          completed: false
        },
        include: {model: Product, as: ProductsInOrder}
      })
      res.json(updatedOrder)
    }
  } catch (error) {
    next(error)
  }
})
