const router = require('express').Router()
const {Product, Order, ProductsInOrder} = require('../db/models')
const {isAdminMiddleware} = require('./middleware')
module.exports = router

//api route /api/products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const {name, category, price, stock, imageUrl, description} = req.body
    const newProductInfo = {name, stock, category, price}
    if (imageUrl) newProductInfo.imageUrl = imageUrl
    if (description) newProductInfo.description = description
    if (stock || stock === 0) newProductInfo.stock = stock

    const newProduct = await Product.create(newProductInfo)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const oneProduct = await Product.findByPk(req.params.productId)
    if (oneProduct) {
      res.json(oneProduct)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.log('Error occured when getting one product', error)
    next(error)
  }
})

router.delete('/:productId', isAdminMiddleware, async (req, res, next) => {
  try {
    const numDeletes = await Product.destroy({
      where: {
        id: req.params.productId
      },
      include: {model: Order, as: ProductsInOrder}
    })
    if (numDeletes === 1) {
      res.sendStatus(204)
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
})
