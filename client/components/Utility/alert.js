import React from 'react'

const alert = () => {
  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
      role="alert"
    >
      <p className="font-bold">Be Warned</p>
      <p>Are you sure you want to delete this?</p>
    </div>
  )
}

export default alert
