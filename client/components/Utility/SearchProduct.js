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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const {search} = this.state
    this.props.loadProducts(search)
  }

  onKeyDown(e) {
    const {search} = this.state
    if (e.key === 'Enter') {
      this.props.loadProducts(search)
    }
  }

  render() {
    const {search} = this.state
    return (
      <div className="flex items-center border-b border-b-2 border-indigo-900 py-2">
        <input
          className="appearance-none  border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="search"
          placeholder="Search Product..."
          aria-label="Full name"
          value={search}
          name="search"
          onKeyDown={this.onKeyDown}
          onChange={this.handleChange}
        />
        <button
          className="flex-shrink-0 bg-indigo-900 hover:bg-indigo-700 border-indigo-900 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          onClick={this.handleSubmit}
        >
          Search
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  loadProducts: search => dispatch(fetchProducts(search))
})

export default connect(null, mapDispatch)(SearchForGame)
