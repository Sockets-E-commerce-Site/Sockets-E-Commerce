import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import Product from './Product'
import ErrorPage from './ErrorPage'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addedToCart: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const {productId} = this.props.match.params
    this.props.fetchProduct(productId)
  }

  handleClick() {
    this.setState({addedToCart: true})
    console.log(this.state)
  }

  render() {
    return (
      <div>
        {this.state.addedToCart ? (
          <div>
            <h1>successfully added to cart!</h1>
          </div>
        ) : (
          <div />
        )}
        {this.props.product ? (
          <Product product={this.props.product} />
        ) : (
          <ErrorPage />
        )}
        <button type="button" onClick={this.handleClick}>
          Add To Cart
        </button>
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
