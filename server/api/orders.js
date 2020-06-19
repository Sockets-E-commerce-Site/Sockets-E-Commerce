const router = require('express').Router()
const {Product, Order} = require('../db/models')
const {Op} = require('sequelize')

module.exports = router

const orderNotFound = next => {
  const error = new Error('order not found')
  error.stack = 404
  next(error)
}

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: Product
      }
    })
    if (!orders) {
      next(orderNotFound)
    } else {
      res.json(orders)
    }
  } catch (error) {
    next(orderNotFound)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const usersOrders = await Order.findAll({
      where: {
        userId,
        [Op.or]: [{status: 'completed'}, {status: 'pending shipping'}]
      },
      include: Product
    })
    res.json(usersOrders)
  } catch (error) {
    next(orderNotFound)
  }
})
