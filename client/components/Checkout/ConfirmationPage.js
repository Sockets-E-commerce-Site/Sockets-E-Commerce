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
        <h1 className="text-xl flex justify-center h-12 relative text-gray-800 font-medium mr-auto">
          Thank you for your order!
        </h1>
        <div className="mt-6 flex justify-center h-12 relative">
          <NavLink
            className="flex shadow-md text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
            to="/orders"
            type="button"
          >
            See Order Here
          </NavLink>
        </div>
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
