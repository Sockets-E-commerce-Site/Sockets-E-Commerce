import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, deleteItem} from '../../store/cart'
import ErrorPage from '../Utility/ErrorPage'
import ProductCard from '../Products/ProductCard'
//will need a fetch(view), update, remove in redux

class Cart extends React.Component {
  componentDidMount() {
    const {userId} = this.props.match.params
    this.props.fetchCart(userId)
  }

  render() {
    return (
      <div>
        {!this.props.cart.id ? (
          <ErrorPage />
        ) : this.props.cart.products.length > 0 ? (
          this.props.cart.products.map(product => {
            return <ProductCard product={product} key={product.id} />
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
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(fetchCart(userId)),
    deleteItem: productId => dispatch(deleteItem(productId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
