import React from 'react'
import {CartProduct, CartTotal, GuestCartProduct} from './index'

export const Cart = props => {
  let products = props.cart.products
  let hasItems = false
  if (products) {
    hasItems = true
  }
  if (!products) {
    console.log('hi', props.cart)
    products = props.cart
    hasItems = true
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
                  if (prod.user) {
                    return (
                      <CartProduct
                        key={prod.id}
                        product={prod}
                        userId={props.user.id}
                        orderId={props.cart.id}
                        remove={props.handleRemove}
                      />
                    )
                  } else {
                    return (
                      <GuestCartProduct
                        key={prod.id}
                        product={prod}
                        remove={props.handleRemove}
                        edit={(event, name) => props.edit(event, name)}
                      />
                    )
                  }
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
