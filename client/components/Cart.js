import React from 'react'
import {CartProduct, CartTotal, GuestCartProduct} from './index'

export const Cart = props => {
  let products = props.cart.products
  if (!products) {
    //GuestUser if props.cart.products does not exist
    products = props.cart
  }
  let hasItems = false
  if (products.length > 0) {
    hasItems = true
  }
  console.log('cart', props)
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
                  if (props.user) {
                    return (
                      <CartProduct
                        key={prod.id}
                        product={prod}
                        userId={props.user.id}
                        orderId={props.cart.id}
                        remove={props.remove}
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
