import React from 'react'

export default function ProductCard(props) {
  const {title, price} = props.product
  const quantity = props.product.productOrder.productQuantity

  return (
    <div>
      <h1>Title: {title}</h1>
      <h1>Price: {price}</h1>
      <h1>Quantity: {quantity}</h1>
      <button type="button" onClick={() => props.deleteItem(props.cart.id)}>
        x
      </button>
    </div>
  )
}
