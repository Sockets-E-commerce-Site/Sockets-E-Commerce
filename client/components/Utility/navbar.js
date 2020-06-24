import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import SearchProduct from './SearchProduct'
import {logout} from '../../store'

/*
component rendering the top mavbar and linking to all parts of our site. Also connects to the search bar component.
*/

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav className="flex items-center justify-between flex-wrap bg-indigo-900 p-6">
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <span className="font-semibold text-xl tracking-tight">Sockets</span>
    </div>
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      {isLoggedIn ? (
        <div className="lg:flex-grow">
          <a
            href="#responsive-header"
            className="block mr-6 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white mr-4"
          >
            <NavLink to="/home">Home</NavLink>
          </a>
          <a
            href="#responsive-header"
            className="block mr-6 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white mr-4"
          >
            <NavLink to="/products">Products</NavLink>
          </a>
          <a
            href="#responsive-header"
            className="block mr-6 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white mr-4"
          >
            <NavLink to="/users/orders/cart">Cart</NavLink>
          </a>
          <a
            href="#responsive-header"
            className="block mr-6 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white"
          >
            <NavLink to="/orders">Orders</NavLink>
          </a>
          <a
            href="#responsive-header"
            className="block mr-6 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white"
          >
            <NavLink to="/dashboard">Dashboard</NavLink>
          </a>
          <a
            href="#responsive-header"
            className="block mr-6 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white"
            onClick={handleClick}
          >
            <NavLink to="/">Logout</NavLink>
          </a>
          <div className="inline-block  mr-3  ">
            <div
              className="inline-block py-2 px-4 text-gray-400 cursor-not-allowed"
              href="#"
            >
              <SearchProduct />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <NavLink to="/login">
              <a
                href="#"
                className="block mr-6 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white mr-4"
              >
                Login
              </a>
            </NavLink>
            <NavLink to="/signup">
              <a
                href="#"
                className="block mr-6 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white mr-4"
              >
                Sign Up
              </a>
            </NavLink>
            <NavLink to="/products">
              <a
                href="#"
                className="block mr-6 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white mr-4"
              >
                Products
              </a>
              <a
                href="#responsive-header"
                className="block mr-6 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white mr-4"
              >
                <NavLink to="/users/orders/cart">Cart</NavLink>
              </a>
              <a
                href="#responsive-header"
                className="block mr-6 lg:inline-block lg:mt-0 text-indigo-100 hover:text-white"
              >
                <NavLink to="/orders">Orders</NavLink>
              </a>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
