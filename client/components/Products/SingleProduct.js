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
    if (this.props.user.id) {
      this.props.fetchCart(this.props.user.id)
    }
  }

  async handleClick() {
    if (this.props.user.id) {
      const productId = this.props.product.id

      if (
        this.props.cart &&
        this.props.cart.products.find(product => product.id === productId)
      ) {
        const additionalProduct = this.props.cart.products.find(
          product => product.id === productId
        )
        const quantity = additionalProduct.productOrder.productQuantity + 1
        this.props.updateQuantity(productId, quantity)
        this.setState({addedToCart: true})
      } else {
        const shoppingList = this.props.cart.products.length
        await this.props.addItem(productId)

        if (shoppingList + 1 === this.props.cart.products.length) {
          this.setState({addedToCart: true})
        } else {
          this.setState({success: false})
        }
      }
    } else {
      await Axios.put(`/api/users/orders/cart`, {
        productId: this.props.product.id
      })
    }
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
