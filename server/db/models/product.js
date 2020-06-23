const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  invQuantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    defaultValue: 0
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRq1bpR57F5E8GJRwpIWBJQpKs_liXmQMG-pf0uFiMKWSG0iKCI&usqp=CAU'
  },
  category: {
    type: Sequelize.ENUM,
    values: ['Video Games', 'PC Parts', 'Drones', 'Other']
  },
  price: {
    type: Sequelize.FLOAT(10, 2)
  }
})

module.exports = Product
