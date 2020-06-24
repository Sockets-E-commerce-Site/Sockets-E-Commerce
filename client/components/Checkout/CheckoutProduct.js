import React from 'react'

/*
Parent: CheckoutPage
Description: Child functional component to render final cart items for this order.
*/

export default function CheckoutProduct(props) {
  const {title, price} = props.product
  let quantity = props.product.productOrder.productQuantity

  let total = props.product.price * quantity

  return (
    <div className="md:flex shadow-lg  mx-6 md:mx-auto my-10 max-w-lg md:max-w-1">
      <h1 className="text-gray-800 font-medium mr-auto">{title}</h1>
      <div>
        <h1 className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Price: ${price}
        </h1>
        <h1 className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Qty: {quantity}
        </h1>
        <div>
          <h1 className="text-gray-800 item-center font-medium mr-auto">
            Total Price: ${total.toFixed(2)}
          </h1>
        </div>
      </div>
    </div>
  )
}
