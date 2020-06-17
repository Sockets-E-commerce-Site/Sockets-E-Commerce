import axios from 'axios'

const SET_PRODUCT = 'SET_PRODUCT'

export const setProduct = product => ({
  type: SET_PRODUCT,
  product
})

export const fetchProduct = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products/:productId')
    dispatch(setProduct(data))
  } catch (error) {
    console.log('error in fetchProduct', error)
  }
}

const singleProduct = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default singleProduct
