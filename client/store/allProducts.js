import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

const getAllProducts = data => ({
  type: GET_PRODUCTS,
  products: data
})

const removedProduct = productId => ({type: DELETE_PRODUCT, productId})

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

export const removeProduct = productId => async dispatch => {
  try {
    const {status} = await axios.delete(`/api/users/${productId}`)
    if (status === 204) {
      dispatch(removedProduct(productId))
    } else if (status === 401) {
      throw new Error('Unauthorized attempt to delete product')
    } else {
      throw new Error('delete product failed')
    }
  } catch (err) {
    console.error(err)
  }
}

export default function allProductsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}
