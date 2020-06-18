import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Homepage from '../Homepage'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h2>Welcome to Sockets, {email}!</h2>
      <br />
      <Homepage />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
