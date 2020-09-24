import React from 'react'
import {CartProduct} from './index.js'
import {Link} from 'react-router-dom'

const Checkout = props => {
  const products = props.location.state.product
  console.log(products)
  return (
    <div>
      <div>
        Shipping
        <input />
        Payment Methods
        <input />
        <div>
          <Link to="/confirmation">
            <button type="button" className="button checkout">
              Make my gray go away!
            </button>
          </Link>
        </div>
      </div>
      <div>
        {products.length} {products.length > 1 ? 'Items' : 'Item'} in Cart
        {/* {
          products.map(product => {
            <div>
              <CartProduct props={product} />
            </div>
          })
        } */}
      </div>
    </div>
  )
}

export default Checkout
