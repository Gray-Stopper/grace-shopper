import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOAD_CART = 'LOAD_CART'

/**
 * INITIAL STATE
 */
const emptyCart = []

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: LOAD_CART, cart})

/**
 * THUNK CREATORS
 */
export const loadCart = userId => async dispatch => {
  try {
    const {data, status} = await axios.get(`/api/cart/${userId}`)
    if (data) dispatch(gotCart(data))
    else if (status === 404) throw new Error('cart empty')
    else throw new Error('error fetching cart')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = emptyCart, action) {
  switch (action.type) {
    case LOAD_CART:
      return action.cart
    default:
      return state
  }
}
