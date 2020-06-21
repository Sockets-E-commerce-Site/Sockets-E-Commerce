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
    return (
      <div>
        {!this.props.cart ? (
          <ErrorPage />
        ) : this.props.cart.products ? (
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
            <h1>Nothing in cart!</h1>
          </div>
        )}
        {this.props.cart.id && this.props.cart.products.length > 0 ? (
          <NavLink to="/checkout" type="button">
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
    fetchCart: () => dispatch(fetchCart()),
    deleteItem: productId => dispatch(deleteItem(productId)),
    updateQuantity: (productId, productQuantity) =>
      dispatch(updateQuantity(productId, productQuantity))
  }
}

export default connect(mapState, mapDispatch)(Cart)
