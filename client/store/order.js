import axios from 'axios'

//ACTION TYPES
const GET_ORDERS = 'GET_ORDERS'

//ACTION CREATORS
export const getOrders = orderInfo => ({
  type: GET_ORDERS,
  orderInfo
})

//THUNKS

//fetch order
export const fetchOrders = userId => async dispatch => {
  try {
    const {data: orders} = await axios.get(`/api/orders/${userId}`)
    dispatch(getOrders(orders))
  } catch (error) {
    console.log('error in fetchOrders thunk', error)
  }
}

//REDUCER
const order = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orderInfo
    default:
      return state
  }
}

export default order
