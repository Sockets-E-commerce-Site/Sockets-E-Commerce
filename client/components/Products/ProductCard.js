/*
This is the child functional single product card/component that is rendering in the parent Cart component
*/

import React from 'react'

export default function ProductCard(props) {
  const {title, price, id} = props.product
  const {userId} = props
  const quantity = props.product.productOrder.productQuantity

  return (
    <div>
      <h1>Title: {title}</h1>
      <h1>Price: {price}</h1>
      <h1>Quantity: {quantity}</h1>
      <button type="button" onClick={() => props.deleteItem(id, userId)}>
        x
      </button>
    </div>
  )
}
