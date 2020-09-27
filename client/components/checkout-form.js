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
    const firstprod = Object.values(this.props.props.location.state.product)[0]
    console.log('firstprod', firstprod)
    if (Object.keys(firstprod).includes('productsInOrder')) {
      this.props.cartCheckout({
        obj: this.props.props.location.state,
        total: this.props.cartTotal
      })
    } else {
      console.log('else')
      //       this.props.cartCheckout({
      //   obj: this.props.props.location.state,
      //   total: this.props.cartTotal
      // })
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
      console.log('obj', obj)
      return dispatch(putCheckOutItems(obj, ownProps))
    }
  }
}

export default connect(mapState, mapDispatch)(CheckOutForm)
