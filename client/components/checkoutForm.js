import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  putCheckOutItems,
  putGuestCheckout,
  shipFormComplete,
  payFormComplete
} from '../store/checkout'
import {ShippingForm} from './shippingForm'
import {PaymentForm} from './paymentForm'

export class CheckOutForm extends Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.filledFields = this.filledFields.bind(this)
  }

  filledFields(type, status) {
    if (status && type === 'ship') {
      this.props.shipForm()
    }
    if (status && type === 'pay') {
      this.props.payForm()
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const cart = Object.keys(this.props.props.location.state.product.cart)
    if (cart.includes('userId')) {
      this.props.cartCheckout({
        obj: this.props.props.location.state,
        total: this.props.cartTotal
      })
    } else {
      this.props.guestCheckOut({
        obj: this.props.props.location.state.product.cart,
        total: this.props.cartTotal
      })
    }
  }

  render() {
    const paymentStatus = !(this.props.shipform && this.props.payform)
    return (
      <div>
        <ShippingForm
          ifFilled={this.filledFields}
          checkTax={this.props.checkTax}
        />
        <PaymentForm ifFilled={this.filledFields} />
        <form onSubmit={this.handleSubmit}>
          <label className="checkoutPage">
            <button
              type="submit"
              className="checkout button checkoutPage"
              disabled={paymentStatus}
            >
              Make my gray go away!
            </button>
          </label>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    shipform: state.checkout.shipping,
    payform: state.checkout.payment
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    cartCheckout: obj => {
      return dispatch(putCheckOutItems(obj, ownProps))
    },
    guestCheckOut: obj => {
      return dispatch(putGuestCheckout(obj, ownProps))
    },
    shipForm: () => {
      return dispatch(shipFormComplete())
    },
    payForm: () => {
      return dispatch(payFormComplete())
    }
  }
}

export default connect(mapState, mapDispatch)(CheckOutForm)
