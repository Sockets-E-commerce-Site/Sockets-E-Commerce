import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'

export const setProducts = productList => ({
  type: SET_PRODUCTS,
  productList
})

export const fetchProducts = () => async dispatch => {
  try {
    const {data: allProjects} = await axios.get('/api/projects')
    dispatch(setProducts(allProjects))
  } catch (error) {
    console.log('error in fetchProducts', error)
  }
}

const products = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.productList
    default:
      return state
  }
}

export default products
