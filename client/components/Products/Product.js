import React from 'react'

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
