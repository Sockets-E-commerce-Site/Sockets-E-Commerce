const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productOrder', {
  productQuantity: {
    type: Sequelize.INTEGER,
    isInt: {
      args: true,
      msg: 'Must be an integer'
    },
    defaultValue: 1
  },
  purchasePrice: {
    type: Sequelize.FLOAT,
    isDecimal: {
      args: true,
      msg: 'Must have only numbers'
    }
  }
})

module.exports = ProductOrder
