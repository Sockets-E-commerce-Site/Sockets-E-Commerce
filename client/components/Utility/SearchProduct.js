import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/products'
/*
searchProduct component which is rendering in our navbar to allow users to search for a product our store holds.
*/

class SearchForGame extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    const {search} = this.state
    this.props.loadProducts(search)
  }

  render() {
    return (
      <div className="flex items-center border-b border-b-2 border-indigo-900 py-2">
        <input
          className="appearance-none  border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="search"
          placeholder="Search Product..."
          aria-label="Full name"
          value={this.state.search}
          name="search"
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  loadProducts: search => dispatch(fetchProducts(search))
})

export default connect(null, mapDispatch)(SearchForGame)
