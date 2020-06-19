import React from 'react'

// maping through reviews

const ReivewsList = props => {
  const {reviews, user} = props
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {reviews.map(review => (
        <div key={review.id} className="px-6 py-4">
          <h4 className="font-bold text-xl mb-2">{user.firstName}</h4>
          <h4 className="font-bold text-xl mb-2">{review.title}</h4>
          <h4 className="font-bold text-xl mb-2">{review.rating}</h4>
          <p className="text-gray-700 text-base">{review.content}</p>
        </div>
      ))}
    </div>
  )
}
export default ReivewsList
