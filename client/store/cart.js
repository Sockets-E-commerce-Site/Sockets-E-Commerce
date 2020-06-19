import axios from 'axios'

//ACTION TYPES
const SET_CART = 'SET_CART'

//ACTION CREATORS
export const setCart = cart => ({
  type: SET_CART,
  cart
})

//THUNKS

//set cart to store
export const fetchCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/orders/cart/${userId}`)
    dispatch(setCart(data))
  } catch (error) {
    console.log('error in fetchCart', error)
  }
}

//remove an item from the cart
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


export const checkout = () => async dispatch => {
  try {
    const {data: finalcart} = await axios.put('./api/cart/checkout')
    dispatch(setCart(finalcart))
  } catch (error) {
    console.log('error in checkoutThunk', error)
  }
}

//update quantity of product in cart
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

//REDUCER
const cart = (state = {}, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart
    default:
      return state
  }
}

export default cart
