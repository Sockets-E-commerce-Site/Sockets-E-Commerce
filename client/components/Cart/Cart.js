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
  constructor() {
    super()
    this.checkout = this.checkout.bind(this)
  }
  componentDidMount() {
    if (this.props.user.id) {
      const userId = this.props.user.id
      this.props.fetchCart(userId)
    }
  }

  checkout = () => {
    this.props.checkout()
  }

  render() {
    return (
      <div>
        {!this.props.cart.id ? (
          <ErrorPage />
        ) : this.props.cart.products.length > 0 ? (
          this.props.cart.products.map(product => {
            return (
              <ProductCard
                product={product}
                userId={this.props.user.id}
                deleteItem={this.props.deleteItem}
                updateQuantity={this.props.updateQuantity}
                key={product.id}
              />
            )
          })
        ) : (
          <div>
            <h1>Nothing in cart!</h1>
          </div>
        )}
        {this.props.cart.id && this.props.cart.products.length > 0 ? (
          <NavLink to="/checkout" type="button" onClick={this.checkout}>
            Checkout!
          </NavLink>
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
    fetchCart: userId => dispatch(fetchCart(userId)),
    deleteItem: (productId, userId) => dispatch(deleteItem(productId, userId)),
    checkout: () => dispatch(checkout()),
    updateQuantity: (productId, userId, productQuantity) =>
      dispatch(updateQuantity(productId, userId, productQuantity))
  }
}

export default connect(mapState, mapDispatch)(Cart)
