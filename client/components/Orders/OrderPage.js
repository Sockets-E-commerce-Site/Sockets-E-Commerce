import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../../store/order'
import ErrorPage from '../Utility/ErrorPage'
import UsersOrders from './UsersOrders'

// shows all the orders for that User
class OrderPage extends Component {
  constructor() {
    super()
    this.state = {
      isLoaded: false
    }
  }

  componentDidMount() {
    this.props.loadOrders()
    this.setState({
      isLoaded: true
    })
  }

  render() {
    const {orders} = this.props
    const {isLoaded} = this.state
    return (
      <div>
        {!orders.length ? (
          <ErrorPage />
        ) : isLoaded && orders.length ? (
          <div>
            {orders.map(order => <UsersOrders key={order.id} order={order} />)}
          </div>
        ) : (
          <h1>nothing in order</h1>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user.id,
  orders: state.order
})

const mapDispatch = dispatch => ({
  loadOrders: () => dispatch(fetchOrders())
})

export default connect(mapState, mapDispatch)(OrderPage)
