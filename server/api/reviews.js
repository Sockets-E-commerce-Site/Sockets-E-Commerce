const router = require('express').Router()
const {Product, Order, Review} = require('../db/models')
const {Op} = require('sequelize')

module.exports = router

// staying DRY
// re use this error in routes
const reviewNotFound = next => {
  const error = new Error('review not found')
  error.stack = 404
  next(error)
}

// /api/reviews/:productId
// finding all reviews for that product
router.get('/:productId', async (req, res, next) => {
  try {
    const {productId} = req.params
    const productsReviews = await Review.findAll({
      where: {
        productId
      }
    })

    if (!productsReviews) {
      next(reviewNotFound)
    } else {
      res.json(productsReviews)
    }
  } catch (error) {
    next(error)
  }
})

// /api/reviews/created/review
// route for creating a review
router.post('/created/review', async (req, res, next) => {
  try {
    const {rating, title, userId, productId, content} = req.body
    const createdReview = await Review.create({
      content,
      rating,
      title,
      userId,
      productId
    })
    // what i did up top is the same thing as the magic methods down below
    // await createdReview.addProduct(productId)
    // await createdReview.addUser(userId)
    if (!createdReview) {
      next(reviewNotFound)
    } else {
      res.json(createdReview)
    }
  } catch (error) {
    next(error)
  }
})

// /api/review/edit
