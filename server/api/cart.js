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

router.put('/add', async (req, res, next) => {
  try {
    console.log(req.body)
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

    console.log(currentOrder)
    console.log(
      'this is the first product in current order: ',
      currentOrder.products[0]
    )

    if (currentOrder.userId !== req.body.userId) {
      res.sendStatus(401)
    } else {
      currentOrder.products.forEach(async product => {
        if (product.id === req.body.productId) {
          const [rows, updatedOrder] = await ProductsInOrder.update({
            quantity: product.productsInOrder.quantity++,
            where: {
              productId: req.body.productId,
              orderId: currentOrder.id
            }
          })
          res.json(updatedOrder)
        }
      })
      const currentProduct = await Product.findByPk(req.body.productId)
      const updatedOrder = await currentOrder.addProduct(currentProduct)
      res.json(updatedOrder)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/:orderId', async (req, res, next) => {
  try {
    const currentCart = await ProductsInOrder.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    const stock = await Promise.all(
      currentCart.map(async product => {
        const stock = await Product.findByPk(product.productId)
        console.log(stock.stock)
        if (product.quantity <= stock.stock) {
          return stock.stock - product.quantity
        } else {
          return -1
        }
      })
    )
    if (stock.includes('-1')) {
      res.status(202).send('Oh-no! Out of Stock!')
    } else {
      for (let i = 0; i < stock.length; i++) {
        let newStock = stock[i]
        let productId = currentCart[i].productId
        Product.update(
          {
            stock: newStock
          },
          {
            where: {
              id: productId
            }
          }
        )
      }
      await Order.update(
        {
          completed: true
        },
        {
          where: {
            userId: req.params.userId,
            id: req.params.orderId
          }
        }
      )
      res.status(200).json({redirectUrl: '/confirmation'})
    }
  } catch (err) {
    next(err)
  }
})
