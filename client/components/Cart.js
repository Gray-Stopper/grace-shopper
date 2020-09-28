import React from 'react'
import {CartProduct, CartTotal} from './index'

export const Cart = props => {
  let products = props.cart.products
  let hasItems = true
  if (!products) {
    products = props.cart
    hasItems = false
  }
  return (
    <div>
      {hasItems ? (
        <div>
          <table className="cart left">
            <thead className="t-head">
              <tr>
                <th />
                <th scope="col">Item</th>
                <th scope="col">Item Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map(prod => {
                  return (
                    <CartProduct
                      key={prod.id}
                      product={prod}
                      userId={props.user.id}
                      orderId={props.cart.id}
                      remove={props.handleRemove}
                    />
                  )
                })}
            </tbody>
          </table>
          {products && <CartTotal cart={props.cart} />}
        </div>
      ) : (
        <p>No items in cart</p>
      )}
    </div>
  )
}
