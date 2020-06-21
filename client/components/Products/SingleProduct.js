import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../../store/singleProduct'
import {addItem, fetchCart, updateQuantity} from '../../store/cart'
import Product from './Product'
import ErrorPage from '../Utility/ErrorPage'
import ReviewsForProduct from '../Reviews/ReviewsForProduct'
import CreateReview from '../Reviews/CreateReview'
import Axios from 'axios'

/*
parent SingleProduct component to render each individual product when you click from the products page. Connects to the child functional component Product.
*/

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addedToCart: false,
      success: true
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const {productId} = this.props.match.params
    this.props.fetchProduct(productId)
    this.props.fetchCart()
  }

  async handleClick() {
    await this.props.addItem(this.props.product.id)
    this.setState({addedToCart: true})
  }

  render() {
    const {productId} = this.props.match.params
    return (
      <div>
        {this.state.addedToCart ? (
          <div>
            <h1>successfully added to cart!</h1>
          </div>
        ) : (
          <div />
        )}
        {this.props.product && this.state.success ? (
          <Product product={this.props.product} />
        ) : (
          <ErrorPage />
        )}
        <button type="button" onClick={this.handleClick}>
          Add To Cart
        </button>
        <CreateReview productId={productId} />
        <ReviewsForProduct productId={productId} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct,
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProduct: productId => dispatch(fetchProduct(productId)),
    addItem: productId => dispatch(addItem(productId)),
    fetchCart: () => dispatch(fetchCart()),
    updateQuantity: (productId, productQuantity) =>
      dispatch(updateQuantity(productId, productQuantity))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
