/*
This is the child functional single product card/component that is rendering in the parent Cart component
*/

import React from 'react'

export default function ProductCard(props) {
  const {title, price, id} = props.product
  const {invQuantity} = props.product

  let quantity = props.product.productOrder.productQuantity
  const selectBar = []

  // for loop to create individual options for Select
  for (let i = 1; i <= invQuantity; i++) {
    selectBar.push(<option value={`${i}`}>{i}</option>)
  }

  return (
    <div>
      <h1>Title: {title}</h1>
      <h1>Price: {price}</h1>
      <h1>Quantity: {quantity}</h1>
      <button type="button" onClick={() => props.deleteItem(id)}>
        Remove from Cart
      </button>
      <br />

      {/* quantity section */}
      <label htmlFor="quantity">Set Quantity: </label>
      <select
        name="quantity"
        onChange={e => props.updateQuantity(id, e.target.value)}
      >
        {selectBar}
      </select>
      <button
        type="button"
        onClick={() => {
          quantity--
          return props.updateQuantity(id, quantity)
        }}
      >
        -
      </button>
      <button
        type="button"
        onClick={() => {
          quantity++
          return props.updateQuantity(id, quantity)
        }}
      >
        +
      </button>
    </div>
  )
}
