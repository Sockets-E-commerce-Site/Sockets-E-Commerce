import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deletedProducts} from '../../store/products'
import ProductList from './ProductList'

/*
parent AllProducts component that uses the ProductList functional component to render out all products in our store
*/

class AllProducts extends Component {
  componentDidMount() {
    this.props.loadProducts()
  }

  //add another component for the map to list out products listProducts
  render() {
    const {products, user} = this.props
    return (
      <div>
        <ProductList products={products} user={user} />
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  products: state.products
})
const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
