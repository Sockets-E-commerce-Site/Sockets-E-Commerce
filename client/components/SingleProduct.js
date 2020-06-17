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
    // const {
    //   id,
    //   invQuantity,
    //   title,
    //   description,
    //   photo,
    //   category,
    //   price,
    // } = this.props.singleProduct

    return (
      <div>
        <h1>Placeholder Text to hook up single product</h1>
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
