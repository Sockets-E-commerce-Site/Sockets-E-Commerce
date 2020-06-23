import React from 'react'
import Review from '../../components/Reviews/Review'

// maping through reviews

const ReivewsList = props => {
  const {reviews, user, productId} = props
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {reviews.map(review => (
        <Review
          review={review}
          user={user}
          productId={productId}
          key={review.id}
        />
      ))}
    </div>
  )
}
export default ReivewsList
