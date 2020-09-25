import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOAD_CART = 'LOAD_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const EDIT_QUANTITY = 'EDIT_QUANTITY'
const EMPTY_CART = 'EMPTY_CART'

/**
 * INITIAL STATE
 */
const defaultCartState = {
  products: []
}

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: LOAD_CART, cart})

const itemRemoved = productId => ({type: REMOVE_ITEM, productId})

const quantityChanged = updates => ({
  type: EDIT_QUANTITY,
  productId: updates.productId,
  quantity: updates.quantity
})

export const emptyCart = () => ({type: EMPTY_CART})

/**
 * THUNK CREATORS
 */

export const addItemThunk = idObj => async dispatch => {
  try {
    const {data, status} = await axios.put('/api/cart/add', idObj)
    if (status === 200) {
      dispatch(gotCart(data))
    } else if (status === 401) {
      throw new Error("Warning: attempt to edit another user's cart")
    } else {
      throw new Error('failed to add item')
    }
  } catch (error) {
    console.error(error)
  }
}

export const loadCart = userId => async dispatch => {
  try {
    const {data, status} = await axios.get(`/api/cart/${userId}`)

    if (data) {
      dispatch(gotCart(data))
    } else if (status === 404) {
      throw new Error('cart empty')
    } else {
      throw new Error('error fetching cart')
    }
  } catch (err) {
    console.error(err)
  }
}

export const removeItem = idObj => async dispatch => {
  try {
    const {status} = await axios.put(`/api/cart/remove`, idObj)

    if (status === 200) {
      dispatch(itemRemoved(idObj.productId))
    } else if (status === 401) {
      throw new Error("Warning: attempt to edit another user's cart")
    } else {
      throw new Error('failed to remove item')
    }
  } catch (err) {
    console.error(err)
  }
}

export const editQuantity = updateObj => async dispatch => {
  try {
    const {data, status} = await axios.put(`/api/cart/quantity`, updateObj)

    if (status === 200) {
      dispatch(quantityChanged(data))
    } else if (status === 401) {
      throw new Error("Warning: attempt to edit another user's cart")
    } else {
      throw new Error('failed to edit item quantity')
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCartState, action) {
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
    case EDIT_QUANTITY:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.productId) {
            product.productsInOrder.quantity = action.quantity
          }
          return product
        })
      }
    case EMPTY_CART:
      return defaultCartState
    default:
      return state
  }
}
