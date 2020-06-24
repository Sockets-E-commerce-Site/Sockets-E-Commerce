import axios from 'axios'

const SET_REVIEWS = 'SET_REVIEWS'
const CREATED_REVIEW = 'CREATED_REVIEW'

export const setReviews = reviewInfo => ({
  type: SET_REVIEWS,
  reviewInfo
})
export const createdReview = reviewData => ({
  type: CREATED_REVIEW,
  reviewData
})

export const fetchReviewsForProduct = productId => async dispatch => {
  try {
    const {data: allReviews} = await axios.get(`/api/reviews/${productId}`)
    dispatch(setReviews(allReviews))
  } catch (error) {
    console.log('error in reivews thunk', error)
  }
}
export const fetchCreatedReview = reviewInfo => async dispatch => {
  try {
    const {data: review} = await axios.post(
      '/api/reviews/created/review',
      reviewInfo
    )
    dispatch(createdReview(review))
  } catch (error) {
    console.log('error in reivews thunk', error)
  }
}
export const fetchUpdatedReview = (review, productId) => async dispatch => {
  try {
    const {data: reviewUpdated} = await axios.put('/api/reviews/edit', {
      review,
      productId
    })
    dispatch(setReviews(reviewUpdated))
  } catch (error) {
    console.log('error in reivews thunk', error)
  }
}

const reivews = (state = [], action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return action.reviewInfo
    case CREATED_REVIEW:
      return [...state, action.reviewData]
    default:
      return state
  }
}

export default reivews
