import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import allProductsReducer from './allProducts'
import cartReducer from './cart'
import singleProductReducer from './product'
import allUsersReducer from './allUsers'
import checkoutReducer from './checkout'

const reducer = combineReducers({
  user: userReducer,
  allUsers: allUsersReducer,
  cart: cartReducer,
  singleProduct: singleProductReducer,
  allProducts: allProductsReducer,
  checkout: checkoutReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
