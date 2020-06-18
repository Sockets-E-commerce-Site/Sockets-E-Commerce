import axios from 'axios'

const SET_CART = 'SET_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'

export const setCart = cart => ({
  type: SET_CART,
  cart
})
export const removeItem = item => ({
  type: REMOVE_ITEM,
  cartId: item.id
})

export const fetchCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/orders/cart`)
    dispatch(setCart(data))
  } catch (error) {
    console.log('error in fetchCart', error)
  }
}

export const deleteItem = item => async dispatch => {
  try {
    axios.delete(`/api/users/101/orders/cart/${item.id}`)
    dispatch(removeItem(item))
  } catch (error) {
    console.log('error in removeItem', error)
  }
}

const cart = (state = {}, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart
    default:
      return state
  }
}

export default cart
