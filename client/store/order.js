import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

export const getOrders = orderInfo => ({
  type: GET_ORDERS,
  orderInfo
})

export const fetchOrders = userId => async dispatch => {
  try {
    console.log('1')
    const {data: orders} = await axios.get(`/api/orders/${userId}`)
    console.log('2')
    dispatch(getOrders(orders))
    console.log('3')
  } catch (error) {
    console.log('error in fetchOrders thunk', error)
  }
}

const order = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orderInfo
    default:
      return state
  }
}

export default order
