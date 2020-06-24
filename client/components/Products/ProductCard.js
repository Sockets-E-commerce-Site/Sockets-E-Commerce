/*
This is the child functional single product card/component that is rendering in the parent Cart component
*/

import React from 'react'

export default function ProductCard(props) {
  const {title, price, id, photo} = props.product
  const {invQuantity} = props.product

  let quantity = props.product.productOrder.productQuantity
  const selectBar = []

  // for loop to create individual options for Select
  for (let i = 1; i <= invQuantity; i++) {
    selectBar.push(<option value={`${i}`}>{i}</option>)
  }

  let total = props.product.price * props.product.productOrder.productQuantity

  return (
    <div className="md:flex shadow-lg  mx-6 md:mx-auto my-10 max-w-lg md:max-w-1 h-64">
      <img
        className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6"
        src={photo}
      />
      <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
        <h1 className="text-xl text-gray-800 font-medium mr-auto">{title}</h1>
        <p className="text-gray-800 font-semibold tracking-tighter">
          Price: ${price.toFixed(2)}
        </p>
        <p>Quantity: {quantity}</p>
        <p>Total Price: {total.toFixed(2)}</p>

        {/* quantity section */}
        <div className="flex items-center justify-left mt-4 top-auto">
          <label htmlFor="quantity">Set Quantity: </label>
          <br />
          <select
            name="quantity"
            onChange={e => props.updateQuantity(id, e.target.value)}
          >
            {selectBar}
          </select>
          <button
            className="flex shadow-md text-white bg-blue-500 border-0 py-1/4 px-3 focus:outline-none hover:bg-blue-600 rounded text-2xl"
            type="button"
            onClick={() => {
              quantity--
              return props.updateQuantity(id, quantity)
            }}
          >
            -
          </button>
          <button
            className="flex shadow-md text-white bg-blue-500 border-0 py-1/4 px-2 focus:outline-none hover:bg-blue-600 rounded text-2xl"
            type="button"
            onClick={() => {
              quantity++
              return props.updateQuantity(id, quantity)
            }}
          >
            +
          </button>
        </div>
        <div className="flex items-center justify-end mt-4 top-auto">
          <button
            type="button"
            onClick={() => props.deleteItem(id)}
            className="flex shadow-md text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
  )
}
