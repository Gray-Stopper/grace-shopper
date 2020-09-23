const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//api route /api/products
router.get('/', async (req, res, next) => {})

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
