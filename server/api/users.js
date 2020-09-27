const router = require('express').Router()
const {User, ProductsInOrder, Product} = require('../db/models')
const {isAdminMiddleware} = require('./middleware')
module.exports = router

router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      isAdmin: req.body.isAdmin
    })
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', isAdminMiddleware, async (req, res, next) => {
  try {
    const [numUpdates, updatedUser] = await User.update(
      {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isAdmin: req.body.isAdmin
      },
      {
        where: {
          id: req.params.userId
        },
        returning: true
      }
    )
    if (numUpdates === 1) {
      res.json(updatedUser)
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', isAdminMiddleware, async (req, res, next) => {
  try {
    const numDeletes = await User.destroy({
      where: {
        id: req.params.userId
      },
      include: {model: Product, as: ProductsInOrder}
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
