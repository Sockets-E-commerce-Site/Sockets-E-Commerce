import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/user'
import UsersList from './UsersList'
import ErrorPage from '../Utility/ErrorPage'

class AdminUsers extends Component {
  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    const {allUsers} = this.props.users
    return (
      <div className="md:px-32 py-8 w-full">
        <div className="shadow overflow-hidden rounded border-b border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Name
                </th>
                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Last name
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Phone
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Email
                </th>
              </tr>
            </thead>
            {allUsers ? (
              <tbody className="text-gray-700">
                {allUsers.map(user => <UsersList user={user} key={user.id} />)}
              </tbody>
            ) : (
              <ErrorPage />
            )}
          </table>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  users: state.user
})
const mapDispatch = dispatch => ({
  loadUsers: () => dispatch(fetchUsers())
})

export default connect(mapState, mapDispatch)(AdminUsers)
