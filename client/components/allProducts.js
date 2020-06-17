import React from 'react'
import {connect} from 'react-redux'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  //add another component for the map to list out products listProducts
  render() {
    return (
      <div>
        <h1>Products</h1>
      </div>
    )
  }
}

const mapState = reduxState => {
  return {
    projects: reduxState.projects
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
