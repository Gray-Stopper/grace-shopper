import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {putCheckOutItems, putGuestCheckout} from '../store/checkout'
import {ShippingForm} from './shipping-form'
import {PaymentForm} from './payment-form'

export class CheckOutForm extends Component {
  constructor(props) {
    super()
    this.state = {
      shipform: false,
      payform: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.filledFields = this.filledFields.bind(this)
  }

  filledFields(type, status) {
    if (status && type === 'ship') {
      this.setState({
        shipform: true
      })
    }
    if (status && type === 'pay') {
      this.setState({
        payform: true
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const cart = Object.keys(this.props.props.location.state.product.cart)
    console.log('cart', this.props.props)
    if (cart.includes('userId')) {
      //if logged in user --- need the state due to user id and product id
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
    const paymentStatus = !(this.state.shipform && this.state.payform)
    // console.log(this.props)
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
              disabled={false}
            >
              Make my gray go away!
            </button>
          </label>
        </form>
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
      return dispatch(putCheckOutItems(obj, ownProps))
    },
    guestCheckOut: obj => {
      return dispatch(putGuestCheckout(obj, ownProps))
    }
  }
}

export default connect(mapState, mapDispatch)(CheckOutForm)
