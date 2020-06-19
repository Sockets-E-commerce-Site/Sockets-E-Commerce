import React from 'react'
import {connect} from 'react-redux'

/*
This is the parent Checkout Component which will connect with the child Checkout Form component.
*/

const CheckoutPage = () => {
  return (
    <div>
      <h1>Checkout</h1>
    </div>
  )
}

const mapState = state => ({
  cart: state.cart
})

export default connect(mapState)(CheckoutPage)
