import axios from 'axios'

const SET_CART = 'SET_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'

export const setCart = cart => ({
  type: SET_CART,
  cart
})
export const removeItem = productId => ({
  type: REMOVE_ITEM,
  productId
})

export const fetchCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/orders/cart`)
    dispatch(setCart(data))
  } catch (error) {
    console.log('error in fetchCart', error)
  }
}

export const deleteItem = productId => async dispatch => {
  try {
    axios.delete(`/api/:userId/orders/cart/${productId.id}`)
    dispatch(removeItem(productId))
  } catch (error) {
    console.log('error in removeItem', error)
  }
}

const cart = (state = {}, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case REMOVE_ITEM:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}

export default cart
