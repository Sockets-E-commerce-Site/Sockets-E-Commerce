import React from 'react'
import {NavLink} from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div>
      <h1>Whoops! Something went wrong!</h1>
      <img src="/images/BongoCat_19.gif" />
      <button
        type="button"
        className="bg-gray-500 w-30 hover:bg-blue-700 text-white px-2  rounded"
      >
        <NavLink to="/home">Go Back Home</NavLink>
      </button>
    </div>
  )
}
