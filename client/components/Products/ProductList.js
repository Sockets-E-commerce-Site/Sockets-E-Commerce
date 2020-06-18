import React from 'react'
import {NavLink} from 'react-router-dom'

const ProductList = props => {
  const {products} = props
  return (
    <div className="flex flex-row flex-wrap">
      {products.map(product => (
        <div
          key={product.id}
          className=" bg-gray-100 item-center mt-10 w-1/5 p-2 mr-4 rounded shadow-xl"
        >
          <h4>{product.category}</h4>
          <h4>{product.title}</h4>
          <h4>{product.invQuantity}</h4>
          <h4>{product.price}</h4>
          <NavLink to={`/products/${product.id}`}>
            <img className="bg-auto " src={product.photo} />
          </NavLink>
          <h4>{product.description}</h4>
        </div>
      ))}
    </div>
  )
}

export default ProductList
