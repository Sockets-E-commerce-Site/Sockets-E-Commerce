/*
This is the functional single product card/component that is rendering in cart
*/

import React from 'react'

export default function ProductCard(props) {
  const {title, price, id} = props.product
  const quantity = props.product.productOrder.productQuantity

  return (
    <div>
      <h1>Title: {title}</h1>
      <h1>Price: {price}</h1>
      <h1>Quantity: {quantity}</h1>
      <button type="button" onClick={() => props.deleteItem(id)}>
        x
      </button>
    </div>
  )
}
