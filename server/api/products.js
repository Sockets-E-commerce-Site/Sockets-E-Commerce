const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

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
    res.json(products)
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
