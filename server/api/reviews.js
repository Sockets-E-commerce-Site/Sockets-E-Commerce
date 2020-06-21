const router = require('express').Router()

const {Product, Order, Review} = require('../db/models')
const {Op} = require('sequelize')
const adminAuthentication = require('./admin')

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
    const {rating, title, productId, content} = req.body
    const userId = req.user.id
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

// /api/reviews/edit
router.put('/edit', async (req, res, next) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const editReview = await Review.findOne({
        where: {
          userId
        }
      })
      const {title, content, rating} = req.body
      editReview.update(
        {
          title,
          content,
          rating
        },
        {
          returning: true
        }
      )
      res.json('review has been updated')
    } else {
      res
        .status(404)
        .send({
          error: {status: 404, message: 'create a account to review a product'}
        })
    }
  } catch (error) {
    next(error)
  }
})

// delete a router a user own reivew
router.delete('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userId = req.user.id
      await Review.destroy({
        where: {
          userId
        }
      })
      res.json('your review was deleted')
    }
  } catch (error) {
    next(error)
  }
})

// admin can edit a review
// /api/reviews/admin/edit
router.put(
  '/admin/edit/:reviewId',
  adminAuthentication,
  async (req, res, next) => {
    try {
      const id = req.params.reviewId
      const [reviewCount, affectReview] = await Review.update(req.body, {
        where: {
          id
        },
        returning: true
      })
      if (!reviewCount) {
        next(reviewNotFound)
      } else {
        res.json('updated')
      }
    } catch (error) {
      next(error)
    }
  }
)
