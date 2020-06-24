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
        <h1 className="text-xl text-gray-800 font-medium mr-auto">Checkout</h1>
        {this.props.cart.products.map(product => {
          return <CheckoutProduct product={product} key={product.id} />
        })}
        <h1 className="text-gray-800 flex justify-center font-semibold tracking-tighter">
          Total: ${total.toFixed(2)}
        </h1>
        <div className="mt-6 flex justify-center h-12 relative">
          <NavLink
            to="/confirmation"
            type="button"
            className="flex shadow-md text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
            onClick={this.checkout}
          >
            Submit Order
          </NavLink>
        </div>
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
