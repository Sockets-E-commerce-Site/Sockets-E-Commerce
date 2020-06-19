import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, deleteItem} from '../../store/cart'
import ErrorPage from '../Utility/ErrorPage'
import ProductCard from '../Products/ProductCard'
//will need a fetch(view), update, remove in redux

/*
Parent Cart component
*/

class Cart extends React.Component {
  componentDidMount() {
    if (this.props.user.id) {
      const userId = this.props.user.id
      this.props.fetchCart(userId)
    }
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
                key={product.id}
              />
            )
          })
        ) : (
          <div>
            <h1>Nothing in cart!</h1>
          </div>
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
    deleteItem: (productId, userId) => dispatch(deleteItem(productId, userId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
