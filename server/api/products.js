const router = require('express').Router()
const {Product} = require('../db/models')
const {Op} = require('sequelize')
const adminAuthentication = require('./admin')
// adminAuthentication going ot put our middileware for eddiitng and deleting products on page

module.exports = router

const productNotFound = next => {
  const error = new Error('Product not found')
  error.stack = 404
  next(error)
}

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

router.post('/', adminAuthentication, async (req, res, next) => {
  try {
    const {title, description, invQuantity, photo, category, price} = req.body
    const addProduct = await Product.creae({
      title,
      description,
      invQuantity,
      photo,
      category,
      price
    })
    if (!addProduct) {
      next(productNotFound)
    } else {
      res.json(addProduct)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', adminAuthentication, async (req, res, next) => {
  try {
    const id = req.params.productId
    await Product.destroy({
      where: {
        id
      }
    })
    res.json('Product removed from list')
  } catch (error) {
    next(error)
  }
})
