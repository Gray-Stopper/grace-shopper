import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allProductsReducer from './allProducts'
import cart from './cart'
import singleProductReducer from './product'
import allUsers from './allUsers'
import checkoutReducer from './checkout'

const reducer = combineReducers({
  user,
  allUsers,
  cart,
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
