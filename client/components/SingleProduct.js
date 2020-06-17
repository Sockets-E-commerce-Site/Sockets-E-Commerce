import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'

export class SingleProduct extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    const {productId} = this.props.match.params
    this.props.fetchProduct(productId)
  }

  render() {
    if (this.props.singleProduct) {
      const {
        id,
        invQuantity,
        title,
        description,
        photo,
        category,
        price
      } = this.props.singleProduct
    }

    console.log('product page!')

    return (
      <div>
        <h1>test updates</h1>
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
