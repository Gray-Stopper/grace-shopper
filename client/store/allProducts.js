import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'

const getAllProducts = data => ({
  type: GET_PRODUCTS,
  products: data
})

export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products`)
      dispatch(getAllProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function allProductsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
