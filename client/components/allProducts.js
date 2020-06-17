import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
// import ProductList from './ProductList'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  //add another component for the map to list out products listProducts
  render() {
    // const {products} = props.products
    return (
      <div>
        <h1>Products</h1>
        {/* <ProductList  products={products} /> */}
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})
const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
