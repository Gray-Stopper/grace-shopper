/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProducts} from './all-products'
export {default as ViewCart} from './view-cart'
export {default as CartTotal} from './cart-total'
export {default as CartProduct} from './cart-product'
export {default as EditCartQuantity} from './edit-cart-quantity'
export {default as Checkout} from './cart-checkout'
export {default as Confirmation} from './cart-confirmation'
export {default as GuestCart} from './guest-cart'
export {default as SingleProduct} from './single-product'
