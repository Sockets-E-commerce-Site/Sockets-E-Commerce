const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

const productNotFound = next => {
  const error = new Error('Product not found')
  error.stack = 404
  next(error)
}

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: [
        'id',
        'invQuantity',
        'title',
        'description',
        'photo',
        'category',
        'price'
      ]
    })

    if (!products) {
      next(productNotFound)
    } else {
      res.json(products)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})
