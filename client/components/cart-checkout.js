import React from 'react'
import {default as CheckOutForm} from './checkout-form'

export const Checkout = props => {
  const cart = props.location.state.product
  const subtotal = props.location.state.subtotal
  const products = cart.products
  const item = products.length > 1 ? 'Items' : 'Item'

  return (
    <div className="checkoutPage">
      <div className="checkoutPageChildren">
        <CheckOutForm props={props} />
      </div>
      <div className="checkoutPageChildren">
        <h3>
          {' '}
          {products.length} {item} in Cart{' '}
        </h3>
        <div>
          {products.map(product => (
            <div key={product.id}>
              {product.name}
              <img src={product.imageUrl} height="40px" width="40px" />
            </div>
          ))}
          <div>
            <table className="total">
              <tbody>
                <tr>
                  <td className="bold">Subtotal</td>
                  <td>{`$${subtotal}`}</td>
                </tr>
                <tr>
                  <td className="bold">Tax</td>
                  <td>TBD</td>
                </tr>
                <tr>
                  <td className="bold">Shipping</td>
                  <td>$5.99</td>
                </tr>
                <tr>
                  <td className="bold">Total</td>
                  <td>{`$${subtotal + 5.99}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
