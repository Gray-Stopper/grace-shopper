import React from 'react'
import {Link} from 'react-router-dom'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Checkout} from './cart-checkout'

const CartTotal = props => {
  let productArr = props.cart.products
  console.log('cart-total', props)
  if (Array.isArray(props.cart)) {
    productArr = props.cart
  }
  const calPrice = productArr.reduce((acc, val) => {
    let orderQuantity
    if (!val.productsInOrder) {
      orderQuantity = val.quantity
    } else {
      orderQuantity = val.productsInOrder.quantity
    }
    return acc + val.price * orderQuantity
  }, 0)
  const totalPrice = Math.round((calPrice + 5.99) * 100) / 100
  return (
    <table className="total">
      <tbody>
        <tr>
          <td className="bold">Subtotal</td>
          <td>{`$${totalPrice}`}</td>
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
          <td>{`$${totalPrice}`}</td>
        </tr>
        <tr>
          <td className="foot">
            <Link
              to={{
                pathname: '/checkout',
                state: {product: props, subtotal: totalPrice}
              }}
            >
              <button type="button" className="button checkout">
                Proceed To Checkout
              </button>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default CartTotal
