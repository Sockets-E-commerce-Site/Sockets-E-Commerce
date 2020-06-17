import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import Product from './Product'
import ErrorPage from './ErrorPage'

export class SingleProduct extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    const {productId} = this.props.match.params
    this.props.fetchProduct(productId)
  }

  render() {
    return (
      <div>
        {this.props.product ? (
          <Product product={this.props.product} />
        ) : (
          <ErrorPage />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProduct: productId => dispatch(fetchProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
