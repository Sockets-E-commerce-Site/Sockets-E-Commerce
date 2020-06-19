import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchReviewsForProduct} from '../../store/reviews'
import ReviewsList from './ReivewsList'

//  all reviews for that specific product will show when you click on a product
//  ReviewsList is the component that renders out all the reviews to the single products page
//  bringing in ProductId from SingleProduct component in the this.props.match.params

class ReviewsForProduct extends Component {
  componentDidMount() {
    const productId = this.props.productId
    this.props.loadReviewsForProduct(productId)
  }

  render() {
    const {reviews} = this.props
    const {user} = this.props
    return (
      <div>
        <ReviewsList user={user} reviews={reviews} />
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  product: state.singleProduct,
  reviews: state.reviews
})

const mapDispatch = dispatch => ({
  loadReviewsForProduct: productId =>
    dispatch(fetchReviewsForProduct(productId))
})
export default connect(mapState, mapDispatch)(ReviewsForProduct)
