import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

class Confirmation extends React.Component {
  render() {
    return (
      <div>
        <h1>Thank you for your order!</h1>
        <p>Please see your order number below</p>
        <NavLink to="/orders" type="button">
          OrderID Here
        </NavLink>
      </div>
    )
  }
}
const mapState = state => {
  return {
    user: state.user.id,
    orders: state.order
  }
}

export default connect(mapState)(Confirmation)
