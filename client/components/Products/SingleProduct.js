import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../../store/singleProduct'
import {addItem, fetchCart, updateQuantity} from '../../store/cart'
import Product from './Product'
import ErrorPage from '../Utility/ErrorPage'
import ReviewsForProduct from '../Reviews/ReviewsForProduct'
import CreateReview from '../Reviews/CreateReview'

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

  handleClick() {
    if (this.props.user.id && this.props.cart) {
      const foundItem = this.props.cart.products.find(
        product => product.id === this.props.product.id
      )
      if (foundItem) {
        const quantity = foundItem.productOrder.productQuantity + 1
        this.props.updateQuantity(this.props.product.id, quantity)
        this.setState({addedToCart: true})
        return
      }
    }
    this.props.addItem(this.props.product.id)
    this.setState({addedToCart: true})
  }

  render() {
    const {productId} = this.props.match.params
    return (
      <div>
        {this.state.addedToCart ? (
          <div
            className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
            role="alert"
          >
            <h1 className="font-bold">Successfully added to cart!</h1>
          </div>
        ) : (
          <div />
        )}
        {this.props.product && this.state.success ? (
          <Product product={this.props.product} />
        ) : (
          <ErrorPage />
        )}
        <div className="mt-6 flex justify-center h-12 relative">
          <button
            type="button"
            className="flex shadow-md text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
            onClick={this.handleClick}
          >
            Add To Cart
          </button>
        </div>
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
