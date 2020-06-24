import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, deleteItem, updateQuantity, checkout} from '../../store/cart'
import ErrorPage from '../Utility/ErrorPage'
import ProductCard from '../Products/ProductCard'
import {NavLink} from 'react-router-dom'

//import {check} from 'prettier'
//will need a fetch(view), update, remove in redux

/*
Parent Cart component that links to child ProductCard functional component to render out all products in a users cart.
also added the checkout button for a user to checkout
*/

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const {products} = this.props.cart
    let total = 0
    products.forEach(product => {
      total += product.price * product.productOrder.productQuantity
    })

    return (
      <div>
        {/* send to error page if there's no cart */}
        {!this.props.cart ? (
          <ErrorPage />
        ) : this.props.cart.products.length ? (
          /* only render cart if cart has a length. Otherwise, render 'nothing in cart' */
          this.props.cart.products.map(product => {
            return (
              <ProductCard
                product={product}
                deleteItem={this.props.deleteItem}
                updateQuantity={this.props.updateQuantity}
                key={product.id}
              />
            )
          })
        ) : (
          <div>
            <h1 className="text-xl text-gray-800 font-medium mr-auto">
              Nothing in cart!
            </h1>
            <NavLink to="/products">
              <h1 className="bg-gray-500 w-24 hover:bg-blue-700 text-white px-2  rounded">
                Shop Now!
              </h1>
            </NavLink>
          </div>
        )}
        {this.props.cart && this.props.cart.products.length > 0 ? (
          //only render checkout if they have a cart with a length
          <div>
            <h1 className="text-gray-800 text-3xl flex justify-center font-semibold tracking-tighter">
              Total: ${total.toFixed(2)}
            </h1>
            <h2 className="mt-6 flex justify-center h-12 relative">
              <NavLink
                to="/checkout"
                type="button"
                className="flex shadow-md text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
              >
                Checkout!
              </NavLink>
            </h2>
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    deleteItem: productId => dispatch(deleteItem(productId)),
    updateQuantity: (productId, productQuantity) =>
      dispatch(updateQuantity(productId, productQuantity))
  }
}

export default connect(mapState, mapDispatch)(Cart)
