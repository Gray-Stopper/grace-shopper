import React, {Component} from 'react'
import {default as CheckOutForm} from './checkout-form'

export class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      tax: 0
    }

    this.stateTax = this.stateTax.bind(this)
  }

  stateTax(validation) {
    if (validation) {
      this.setState({
        tax: 0.07
      })
    }
  }

  render() {
    const cart = this.props.location.state.product
    const subtotal = this.props.location.state.subtotal
    const products = cart.products
    const item = products.length > 1 ? 'Items' : 'Item'
    const calTax = Math.round(subtotal * 100 * this.state.tax) / 100
    const tax = this.state.tax !== 0 ? `$${calTax}` : 'TBD'
    return (
      <div className="checkoutPage">
        <div className="checkoutPageChildren">
          <CheckOutForm props={this.props} checkTax={this.stateTax} />
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
                    <td>{tax}</td>
                  </tr>
                  <tr>
                    <td className="bold">Shipping</td>
                    <td>$5.99</td>
                  </tr>
                  <tr>
                    <td className="bold">Total</td>
                    <td>{`$${subtotal + 5.99 + calTax}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// export const Checkout = props => {

// }
