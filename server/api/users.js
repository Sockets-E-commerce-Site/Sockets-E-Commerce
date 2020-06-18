const router = require('express').Router()
const {User, Product, Order, ProductOrders} = require('../db/models')
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
      attributes: ['id', 'email', 'isAdmin', 'firstName', 'lastName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await User.findByPk(id)
    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/orders/cart', async (req, res, next) => {
  try {
    const usersCart = await Order.findOne({
      where: {
        [Op.and]: [{id: req.params.userId}, {status: 'in cart'}]
      },
      include: {
        model: Product,
        ProductOrders
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

router.put('/:userId/orders/cart', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const [newOrder, created] = await Order.findOrCreate({
      where: {
        userId,
        status: 'in cart'
      }
    })

    const product = await Product.findByPk(req.body.productId)

    await newOrder.addProduct(product)

    const cart = await Order.findOne({
      where: {
        id: newOrder.id
      },
      include: Product
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})
