import React from 'react'
import {connect} from 'react-redux'
import {viewCart} from '../store/cart'
//will need a fetch(view), update, remove in redux

class Cart extends React.Component {
  componentDidMount() {
    this.props.viewCart()
  }

  render() {
    if (!this.props.cart) {
      return (
        <div>
          <h1>Cart is Empty</h1>
        </div>
      )
    } else {
      return (
        <div>
          {this.props.cart.map(item => (
            <div key={item.product.id}>
              <h1>Title: {item.product.title}</h1>
              <h1>Price: {item.product.price}</h1>
              <h1>Quantity: {item.quantity}</h1>
            </div>
          ))}
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    cart: state.cart.items
  }
}

const mapDispatch = dispatch => {
  return {
    viewCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
