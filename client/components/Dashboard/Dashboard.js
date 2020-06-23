import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

class Dashboard extends Component {
  render() {
    const {user} = this.props
    return (
      <div className=" bg-white">
        <div className="flex  flex-col ">
          <div className="w-64 bg-indigo-900 h-screen bg-white">
            <nav className="mt-10">
              <NavLink to="/dashboard/accountsettings">
                <a
                  className="flex items-center mt-5 py-2 px-8 block text-gray-600 border-r-4 border-white hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700"
                  href="#"
                >
                  <span className="mx-4 font-medium">Account Settings</span>
                </a>
              </NavLink>
              {user.isAdmin ? (
                <NavLink to="/dashboard/admin">
                  <a
                    className="flex items-center mt-5 py-2 px-8 block text-gray-600 border-r-4 border-white hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700"
                    href="#"
                  >
                    <span className="mx-4 font-medium">Admin</span>
                  </a>
                </NavLink>
              ) : null}
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState, null)(Dashboard)
