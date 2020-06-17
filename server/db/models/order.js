const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(['in cart', 'pending shipping', 'completed']),
    default: 'in cart',
    allowNull: false
  }
})

module.exports = Order
