import axios from 'axios'

const ALL_PRODUCTS = 'ALL_PRODUCTS'

const allProducts = data => {
  return {
    type: ALL_PRODUCTS,
    products: data
  }
}

export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/products')
      dispatch(allProducts(res.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function allProductsReducer(state = [], action) {
  switch (action.type) {
    case ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
