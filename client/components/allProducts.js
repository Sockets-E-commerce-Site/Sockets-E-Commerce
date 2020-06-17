import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import ProductList from './ProductList'

class AllProducts extends Component {
  componentDidMount() {
    this.props.loadProducts()
  }
  //add another component for the map to list out products listProducts
  render() {
    const {products} = this.props
    console.log(products)
    return (
      <div>
        <h1 className="text-blue-500">Products</h1>
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
