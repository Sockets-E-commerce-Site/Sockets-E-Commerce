const router = require('express').Router()
const {Product} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

const productNotFound = next => {
  const error = new Error('Product not found')
  error.stack = 404
  next(error)
}

// %tanks find any values that  end with tanks
// tanks% find any values that start  with tanks
// %tanks% find any values that have tanks in any postion

// this will be our serarch catelog
// waht ever we search for in the catelog it will find that product from the title that matches the search query we typed in

router.get('/', async (req, res, next) => {
  try {
    let filter = {}
    const search = req.query.search

    if (search) {
      filter = {
        where: {
          title: {
            [Op.iLike]: `%${search}%`
          }
        }
      }
    }

    const products = await Product.findAll(filter)
    if (products) {
      res.json(products)
    } else {
      next(productNotFound)
    }
  } catch (error) {
    next(error)
  }
})
