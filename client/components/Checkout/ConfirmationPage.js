import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

class Confirmation extends React.Component {
  render() {
    return (
      <div>
        <h1>Thank you for your order!</h1>
        <p>Please see your order number below</p>
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

export default connect(mapState)(Confirmation)
