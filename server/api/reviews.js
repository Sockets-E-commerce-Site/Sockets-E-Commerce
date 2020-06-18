const router = require('express').Router()
const {Review, User, Product} = require('../db/models')
const {Op} = require('sequelize')

module.exports = router

router.get('/:productId', async (req, res, next) => {
  try {
    const {productId} = req.params.productId
    const productReviews = await Review.findAll({
      where: {
        productId
      }
    })
    res.json(productReviews)
  } catch (error) {
    next(error)
  }
})
