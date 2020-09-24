import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOAD_CART = 'LOAD_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'

/**
 * INITIAL STATE
 */
const emptyCart = {
  products: []
}

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: LOAD_CART, cart})
const itemRemoved = productId => ({type: REMOVE_ITEM, productId})

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

export const removeItem = idObj => async dispatch => {
  try {
    const {status} = await axios.put(`/api/cart/remove`, idObj)
    if (status === 200) dispatch(itemRemoved(idObj.productId))
    else if (status === 401)
      throw new Error("Warning: attempt to edit another user's cart")
    else throw new Error('failed to remove item')
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
    case REMOVE_ITEM:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.productId
        )
      }
    default:
      return state
  }
}
