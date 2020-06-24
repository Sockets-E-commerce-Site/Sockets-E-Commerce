import React from 'react'

const NoOrdersAllert = () => {
  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
      role="alert"
    >
      <p className="font-bold">No Orders</p>
      <p>
        You currently have no orders, please purhase an item so see all prveious
        orders
      </p>
    </div>
  )
}

export default NoOrdersAllert
