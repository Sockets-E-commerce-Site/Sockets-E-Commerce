import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
/*
this is our homepage render component
*/
export default class Homepage extends Component {
  render() {
    return (
      <div>
        <NavLink to="/products">
          <h1 className="bg-gray-500 w-24 hover:bg-blue-700 text-white px-2  rounded">
            Shop Now!
          </h1>
        </NavLink>
      </div>
    )
  }
}
