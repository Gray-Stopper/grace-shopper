import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = {}

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      const product = data
      dispatch(getProduct(product))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function singleProductReducer(state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
