import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

/**
 * ACTION CREATORS
 */
const getAllProducts = products => ({type: GET_PRODUCTS, products})

const removedProduct = productId => ({type: DELETE_PRODUCT, productId})

const addedProduct = product => ({type: ADD_PRODUCT, product})

const editedProduct = (id, product) => ({type: EDIT_PRODUCT, id, product})

/**
 * THUNK CREATORS
 */
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

export const addProduct = productInfo => async dispatch => {
  try {
    const {data, status} = await axios.post('/api/products/', productInfo)
    if (status === 200) {
      dispatch(addedProduct(data))
    } else if (status === 401) {
      throw new Error('Unauthorized attempt to add user')
    } else {
      throw new Error('add user failed')
    }
  } catch (err) {
    console.error(err)
  }
}

export const removeProduct = productId => async dispatch => {
  try {
    const {status} = await axios.delete(`/api/products/${productId}`)
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

export const editProduct = productInfo => async dispatch => {
  try {
    const {data, status} = await axios.put(
      '/api/products/' + productInfo.id,
      productInfo
    )
    if (status === 200) {
      dispatch(editedProduct(productInfo.id, data))
    } else if (status === 401) {
      throw new Error('Unauthorized attempt to edit product')
    } else {
      throw new Error('edit product failed')
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function allProductsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case EDIT_PRODUCT:
      return state.map(product => {
        if (product.id === action.id) {
          return action.product[0]
        } else {
          return product
        }
      })
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}
