const router = require('express').Router()
const {User, Product, Order} = require('../db/models')
const {Op} = require('sequelize')

module.exports = router

// when you do to cart
// to get the current order from that user with all the prdocuts inside of that order
// /api/user/:userId/order/cart

const userNotFound = next => {
  const error = new Error('Product not found')
  error.stack = 404
  next(error)
}

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/orders/cart', async (req, res, next) => {
  try {
    const usersCart = await Order.findOne({
      where: {
        [Op.and]: [{id: req.params.userId}, {status: 'in cart'}]
      },
      include: {
        model: Product
      }
    })
    if (!usersCart) {
      next(userNotFound)
    } else {
      res.json(usersCart)
    }
  } catch (error) {
    next(userNotFound)
  }
})
