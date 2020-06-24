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
    <div>
      <h1>Title: {title}</h1>
      <h1>Price: {price}</h1>
      <h1>Quantity: {quantity}</h1>
      <h1>Total Price: ${total}</h1>
    </div>
  )
}
