import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORY = 'GET_CATEGORY'

/**
 * ACTION CREATORS
 */
const getCategory = items => ({type: GET_CATEGORY, items})

/**
 * THUNK CREATORS
 */
export const fetchCategory = category => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/type/${category}`)
      const product = data
      dispatch(getCategory(product))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function categoryProductsReducer(state = [], action) {
  switch (action.type) {
    case GET_CATEGORY:
      return action.items
    default:
      return state
  }
}
