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
    let alert
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
          let limit = 10
          if (product.stock < 10) {
            limit = product.stock
          }
          if (
            product.id === req.body.productId &&
            product.productsInOrder.quantity < limit
          ) {
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
          } else if (
            product.id === req.body.productId &&
            product.productsInOrder.quantity >= limit
          ) {
            alert = true
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
      if (alert) {
        res.json({updatedOrder, alert: alert})
      } else {
        res.json(updatedOrder)
      }
    }
  } catch (error) {
    next(error)
  }
})

//submit an order for cart
router.put('/:userId/:orderId', async (req, res, next) => {
  try {
    const currentCart = await ProductsInOrder.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    const stock = await Promise.all(
      currentCart.map(async product => {
        const inventory = await Product.findByPk(product.productId)
        if (product.quantity <= inventory.stock) {
          return inventory.stock - product.quantity
        } else {
          return -1
        }
      })
    )
    if (stock.includes(-1)) {
      const outStockItems = stock
        .map((element, index) => {
          if (element === -1) {
            return currentCart[index].productId
          }
        })
        .filter(productId => productId !== undefined)
      await Promise.all(
        outStockItems.map(async productId => {
          const item = await Product.findByPk(productId)
          return item.name
        })
      ).then(result => {
        res.status(202).json({redirectUrl: '/cart', alert: result})
      })
    } else {
      for (let i = 0; i < stock.length; i++) {
        let newStock = stock[i]
        let productId = currentCart[i].productId
        await Product.update(
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
      const pennies = req.body.total * 100
      await Order.update(
        {
          completed: true,
          subtotal: pennies
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

router.put('/guestCheckout', async (req, res, next) => {
  try {
    const products = req.body.obj
    const stock = await Promise.all(
      products.map(async product => {
        const inventory = await Product.findOne({
          where: {
            name: product.name
          }
        })
        if (product.quantity <= inventory.stock) {
          return inventory.stock - product.quantity
        } else {
          return -1
        }
      })
    )
    if (stock.includes(-1)) {
      const outStockItems = stock
        .map((element, index) => {
          if (element === -1) {
            return products[index].name
          }
        })
        .filter(prodName => prodName !== undefined)
      res.status(202).json({redirectUrl: '/cart', alert: outStockItems})
    } else {
      for (let i = 0; i < stock.length; i++) {
        let newStock = stock[i]
        let productName = products[i].name
        await Product.update(
          {
            stock: newStock
          },
          {
            where: {
              name: productName
            }
          }
        )
      }
      res.status(200).json({redirectUrl: '/confirmation'})
    }
  } catch (err) {
    next(err)
  }
})
