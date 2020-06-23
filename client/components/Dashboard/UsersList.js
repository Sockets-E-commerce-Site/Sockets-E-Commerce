import React from 'react'

const UsersList = props => {
  const {user} = props
  return (
    <tr>
      <td className="w-1/3 text-left py-3 px-4">TBD</td>
      <td className="w-1/3 text-left py-3 px-4">TBD</td>
      <td className="w-1/3 text-left py-3 px-4">{user.email}</td>
    </tr>
  )
}

export default UsersList
