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
                {products.map(product => (
                  <tr key={product.id}>
                    <td className="foot">
                      <img src={product.imageUrl} className="pay-img" />
                    </td>
                    <td className="foot longName">{product.name}</td>
                    <td className="foot">
                      x{product.productsInOrder.quantity}
                    </td>
                  </tr>
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

// export const Checkout = props => {

// }
