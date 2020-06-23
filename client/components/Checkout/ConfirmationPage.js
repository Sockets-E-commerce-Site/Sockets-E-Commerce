import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

/*
This is the confirmation page where after a user checksout, they will see a confirmation and their order details.
*/

class Confirmation extends React.Component {
  render() {
    return (
      <div>
        <h1>Thank you for your order!</h1>
        <NavLink to="/orders" type="button">
          See Order Here
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
