import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCategory} from '../../store/products'

class DropDownMenu extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.loadCategory(e.target.value)
  }
  render() {
    return (
      <div>
        <div>
          <select
            onChange={this.handleChange}
            className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
          >
            <option value="All">All</option>
            <option value="Video Games">Video Games</option>
            <option value="PC Parts">PC Parts</option>
            <option value="Drones">Drones</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  loadCategory: query => dispatch(getCategory(query))
})

export default connect(null, mapDispatch)(DropDownMenu)
