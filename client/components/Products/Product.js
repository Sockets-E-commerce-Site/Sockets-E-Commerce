import React from 'react'

/*
functional child Product component connected to the parent SingleProduct component which lists all details related to each individual product
*/

export default function Product(props) {
  const {
    id,
    invQuantity,
    title,
    description,
    photo,
    price,
    category
  } = props.product

  return (
    <div>
      <h1>{title}</h1>
      <img src={photo} />
      <p>{price}</p>
      <p>{invQuantity}</p>
      <p>{category}</p>
      <p>{description}</p>
    </div>
  )
}
