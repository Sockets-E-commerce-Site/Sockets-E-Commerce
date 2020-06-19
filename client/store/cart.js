import axios from 'axios'

const SET_CART = 'SET_CART'

export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const fetchCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/orders/cart/${userId}`)
    dispatch(setCart(data))
  } catch (error) {
    console.log('error in fetchCart', error)
  }
}

export const deleteItem = (productId, userId) => async dispatch => {
  try {
    const {data: updatedCart} = await axios.delete(`/api/users/orders/cart`, {
      data: {
        userId,
        productId
      }
    })

    dispatch(setCart(updatedCart))
  } catch (error) {
    console.log('error in deleteItem', error)
  }
}

export const updateQuantity = (
  productId,
  userId,
  productQuantity
) => async dispatch => {
  try {
    const {data: updatedCart} = await axios.put('/api/cart/edit', {
      userId,
      productId,
      productQuantity
    })
    dispatch(setCart(updatedCart))
  } catch (error) {
    console.log('error in updateQuantity', error)
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
