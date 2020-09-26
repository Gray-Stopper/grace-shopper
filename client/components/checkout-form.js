import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {putCheckOutItems} from '../store/checkout'
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
    this.props.cartCheckout(this.props.props.location.state)
  }

  render() {
    const paymentStatus =
      !(this.state.shipform && this.state.payform)
    return (
      <div>
        <div>
          <ShippingForm ifFilled={this.filledFields} />
        </div>
        <div>
          <PaymentForm ifFilled={this.filledFields} />
        </div>
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

export default connect(mapState, mapDispatch)(CheckOutForm)
