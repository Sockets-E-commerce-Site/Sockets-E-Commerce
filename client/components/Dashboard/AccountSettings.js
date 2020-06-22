import React, {Component} from 'react'
import {update} from '../../store/user'
import {connect} from 'react-redux'

class AccountSettings extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    if (this.state.newPassword) {
      if (this.state.newPassword !== this.state.confirmPassword) {
        return "passwords don't match"
      } else {
        //changepassword thunk
      }
    }
    const {firstName, lastName, password, email} = this.state
    this.props.update(firstName, lastName, password, email)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {
      firstName,
      lastName,
      password,
      newPassword,
      email,
      confirmPassword
    } = this.state
    return (
      <div>
        <form
          className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
          onSubmit={this.handleSubmit}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <label className="uppercase text-gray-700 text-xs font-boldm py-1 px-4 tracking-wide mr-2 ">
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
                placeholder="First Name"
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <label className="uppercase text-gray-700 text-xs font-boldm py-1 px-4 tracking-wide mr-2 ">
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                name="lastName"
                value={lastName}
                onChange={this.handleChange}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <label className="uppercase text-gray-700 text-xs font-boldm py-1 px-4 tracking-wide mr-2 ">
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <label className="uppercase text-gray-700 text-xs font-boldm py-1 px-4 tracking-wide mr-2 ">
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="********"
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <label className="uppercase text-gray-700 text-xs font-boldm py-1 px-4 tracking-wide mr-2 ">
                New Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={this.handleChange}
                placeholder="********"
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <label className="uppercase text-gray-700 text-xs font-boldm py-1 px-4 tracking-wide mr-2 ">
                Confirm New Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                placeholder="********"
                required
              />
            </div>
            <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto" />
            <button
              type="submit"
              className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  update: (firstName, lastName, password, email) =>
    dispatch(update(firstName, lastName, password, email))
})

export default connect(mapState, mapDispatch)(AccountSettings)
