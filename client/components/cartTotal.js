import React from 'react'
import {Link} from 'react-router-dom'

const CartTotal = props => {
  const totalPrice = props.cart.products.reduce((acc, val) => {
    return acc + val.price * val.productsInOrder.quantity
  }, 0)
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
          <td>{`$${totalPrice + 5.99}`}</td>
        </tr>
        <tr>
          <td className="foot">
            <Link
              to={{
                pathname: '/checkout',
                state: {product: props.cart, subtotal: totalPrice}
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
