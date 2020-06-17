import React from 'react'

const ProductList = props => {
  const {products} = props
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h4>{product.category}</h4>
          {/* <h4>{product.title}</h4>
          <h4>{product.invQuantity}</h4>
          <h4>{product.description}</h4> */}
          <img src={product.photo} />
        </div>
      ))}
    </div>
  )
}

export default ProductList
