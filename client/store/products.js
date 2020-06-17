import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'

export const setProducts = productList => ({
  type: SET_PRODUCTS,
  productList
})

export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/projects')
    dispatch(setProducts(data))
  } catch (error) {
    console.log('error in fetchProducts', error)
  }
}
