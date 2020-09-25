import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {putCheckOutItems} from '../store/checkout'

export class Checkout extends Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.cartCheckout(this.props.location.state)
  }

  render() {
    const cart = this.props.location.state.product
    const subtotal = this.props.location.state.subtotal
    const products = cart.products
    const item = products.length > 1 ? 'Items' : 'Item'

    return (
      <div>
        <div>
          Shipping
          <input />
          <p>Standard shipping is $5.99, more options coming soon</p>
          Payment Methods
          <input />
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                <input type="submit" value="Make my gray go away!" />
              </label>
            </form>
          </div>
        </div>
        <div>
          <h3>
            {products.length} {item} in Cart
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
}

const mapState = () => {
  return {}
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    cartCheckout: obj => {
      dispatch(putCheckOutItems(obj, ownProps))
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
