import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
const DELETE_PRODUCTS = 'DELETE_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'

export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})
export const deleteProduct = productId => ({
  type: DELETE_PRODUCTS,
  productId
})
export const createdProduct = product => ({
  type: CREATE_PRODUCT,
  product
})

export const fetchProducts = query => async dispatch => {
  try {
    if (!query) {
      const {data: allproducts} = await axios.get('/api/products')
      dispatch(setProducts(allproducts))
    } else {
      const {data: products} = await axios.get(`/api/products?search=${query}`)
      dispatch(setProducts(products))
    }
  } catch (error) {
    console.log('error in fetchProducts', error)
  }
}

export const getCategory = query => async dispatch => {
  try {
    const {data: category} = await axios.get(
      `/api/products/filter/category?category=${query}`
    )
    dispatch(setProducts(category))
  } catch (error) {
    console.log('error in category product thunk', error)
  }
}
export const createProduct = productInfo => async dispatch => {
  try {
    const {data: productCreated} = await axios.post(
      '/api/products',
      productInfo
    )
    dispatch(createdProduct(productCreated))
  } catch (error) {
    console.log('error in create product thunk', error)
  }
}
// admin post route creating a porduct for site

export const deletedProducts = productId => async dispatch => {
  try {
    await axios.delete(`/api/products/${productId}`)
    dispatch(deleteProduct(productId))
  } catch (error) {
    console.log('error in fetchProducts', error)
  }
}

const products = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCTS:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}

export default products
