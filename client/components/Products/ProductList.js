import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {deletedProducts} from '../../store/products'
import alert from '../Utility/alert'

/*
functional child productList component connected to the allProducts parent to map through all products in our store
*/
const ProductList = props => {
  const {products, user} = props

  function handleDelete(productId) {
    props.deletedProduct(productId)
  }

  return (
    <div className="flex flex-row flex-wrap">
      {products.map(product => (
        <div
          key={product.id}
          className=" bg-gray-100 item-center mt-10 w-1/5 p-2 mr-4 rounded shadow-xl"
        >
          <h4 className="text-gray-900 text-xl flex items-center justify-center title-font font-medium mb-1">
            {product.title}
          </h4>
          <h4 className="inline-block bg-gray-200 flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {product.category}
          </h4>
          <h4 className="text-gray-800 flex items-center justify-center font-semibold tracking-tighter">
            ${product.price}
          </h4>
          <NavLink to={`/products/${product.id}`}>
            <img className="bg-auto " src={product.photo} />
          </NavLink>
          {user.isAdmin ? (
            <button
              className="bg-red-500 hover:bg-red-700  text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => {
                if (
                  window.confirm('Are you sure you wish to delete this item?')
                )
                  handleDelete(product.id)
              }}
            >
              Delete
            </button>
          ) : null}
        </div>
      ))}
    </div>
  )
}

const mapDispatch = dispatch => ({
  deletedProduct: productId => dispatch(deletedProducts(productId))
})

export default connect(null, mapDispatch)(ProductList)
