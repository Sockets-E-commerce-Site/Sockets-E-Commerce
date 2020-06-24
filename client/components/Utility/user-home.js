import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Homepage from '../Homepage'

/**
 once logged in, userHome welcomes the user and shows you are logged in.
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
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
