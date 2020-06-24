import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
/*
this is our homepage render component
*/
export default class Homepage extends Component {
  render() {
    return (
      <section className="bg-white border-b py-8">
        <div className="container max-w-5xl mx-auto m-8">
          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Sockets
          </h1>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
          </div>

          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <NavLink to="/products">
                <p className="text-gray-600 mb-8">
                  Welcome the Sockets! Shop for electronic equipment now! <br />
                  <br />
                  Shop Now
                </p>
                <h1 className="bg-gray-500 w-24 hover:bg-blue-700 text-white px-2  rounded">
                  Shop Now!
                </h1>
              </NavLink>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <svg
                className="w-full sm:h-64 mx-auto"
                viewBox="0 0 1177 598.5"
                xmlns="http://www.w3.org/2000/svg"
              />
            </div>
          </div>

          <div className="flex flex-wrap flex-col-reverse sm:flex-row">
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <svg
                className="w-5/6 sm:h-64 mx-auto"
                viewBox="0 0 1176.60617 873.97852"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>connected world</title>
              </svg>
            </div>
            <div className="w-full sm:w-1/2 p-6 mt-6" />
          </div>
        </div>
      </section>
    )
  }
}
