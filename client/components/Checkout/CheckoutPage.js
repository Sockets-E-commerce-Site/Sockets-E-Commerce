import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, checkout} from '../../store/cart'
import CheckoutProduct from './CheckoutProduct'
import {NavLink} from 'react-router-dom'

/*
Children: CheckoutProduct
Description: This is the parent CheckoutPage which will grab the final cart for that user and then will calculate final price and use Stripe API for final checkout.
*/

class CheckoutPage extends React.Component {
  constructor() {
    super()
    this.checkout = this.checkout.bind(this)
  }
  componentDidMount() {
    if (this.props.user.id) {
      this.props.fetchCart()
    }
  }

  checkout = () => {
    this.props.checkout()
  }

  render() {
    const {products} = this.props.cart
    let total = 0
    products.forEach(product => {
      total += product.price * product.productOrder.productQuantity
    })

    return (
      <div>
        <h1>Checkout</h1>
        {this.props.cart.products.map(product => {
          return <CheckoutProduct product={product} key={product.id} />
        })}
        <h1>Total: ${total}</h1>
        <NavLink to="/confirmation" type="button" onClick={this.checkout}>
          Submit Order
        </NavLink>
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
    checkout: () => dispatch(checkout())
  }
}

export default connect(mapState, mapDispatch)(CheckoutPage)
