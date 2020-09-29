import React, {Component} from 'react'
import {default as CheckOutForm} from './checkoutForm'
import {SideCartView} from './sideCartView'

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
    const cart = this.props.location.state.product.cart
    const subtotal = this.props.location.state.subtotal
    let products = cart.products
    if (Array.isArray(cart)) {
      products = cart
    }
    const calTax = Math.round(subtotal * this.state.tax * 100) / 100
    const tax = this.state.tax !== 0 ? `$${calTax}` : 'TBD'
    const total = Math.round((subtotal + 5.99 + calTax) * 100) / 100
    return (
      <div className="checkoutPage">
        <div className="checkoutPageChildren">
          <CheckOutForm
            props={this.props}
            checkTax={this.stateTax}
            cartTotal={total}
          />
        </div>
        <div className="checkoutPageChildren">
          <h3 className="formHeader">Cart Items</h3>
          <div>
            <table>
              <tbody>
                {products.map((product, index) => (
                  // Index being used as key as guest cart products in local storage do not have ordered / sequential IDs
                  <SideCartView key={index} item={product} />
                ))}
              </tbody>
            </table>
            <div>
              <table className="total">
                <tbody>
                  <tr>
                    <td className="bold rowSpaces">Subtotal</td>
                    <td className="rightAdjust">{`$${subtotal}`}</td>
                  </tr>
                  <tr>
                    <td className="bold">Tax</td>
                    <td className="rightAdjust">{tax}</td>
                  </tr>
                  <tr>
                    <td className="bold">Shipping</td>
                    <td className="rightAdjust">$5.99</td>
                  </tr>
                  <tr>
                    <td className="bold">Total</td>
                    <td className="rightAdjust">{`$${total}`}</td>
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
