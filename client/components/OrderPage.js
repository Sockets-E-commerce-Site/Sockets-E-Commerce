import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/cart'

class OrderPage extends Component {
  constructor() {
    super()
    this.state = {
      isLoaded: false
    }
  }

  componentDidMount() {
    this.setState({isLoaded: true})
    const userId = this.props.user
    this.props.loadOrder(userId)
  }

  render() {
    console.log(this.props)
    const {isLoaded} = this.state
    return (
      <div>
        <h1>hi</h1>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user.id,
  order: state.order
})

const mapDispatch = dispatch => ({
  loadOrder: userId => dispatch(fetchOrders(userId))
})

export default connect(mapState, mapDispatch)(OrderPage)
