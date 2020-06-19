import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/products'
import ProductList from './ProductList'

/*
parent AllProducts component that uses the ProductList functional component to render out all products in our store
*/

class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      filterText: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  handleChange(e) {
    this.setState({
      filterText: e.target.value
    })
  }

  //add another component for the map to list out products listProducts
  render() {
    const {products} = this.props
    const {filterText} = this.state
    return (
      <div>
        {/* <SearchProduct /> */}
        {/* <select
          id="select"
          value={filterText}
          defaultValue="all"
          onChange={this.handleChange}
        >
          <option value="Other">Other</option>
          <option value="PC Parts">PC Parts</option>
          <option value="Video Games">Video Games</option>
          <option value="Drones">Drones</option>
        </select> */}
        <ProductList products={products} />
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})
const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
