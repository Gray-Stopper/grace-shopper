import React, {Component} from 'react'
import {connect} from 'react-redux'

export class PaymentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvv: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        if (Object.values(this.state).indexOf('') === -1) {
          this.props.ifFilled('pay', true)
        }
      }
    )
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <h1>Payment</h1>
        <p>other payment methods coming soon!</p>
        <form onSubmit={this.handleSubmit}>
          <label className="center form">
            <h3>Card Number</h3>
            <div>
              <input
                className="text"
                type="text"
                name="cardNumber"
                value={this.state.cardNumber}
                onChange={this.handleChange}
              />
            </div>
          </label>
          <label className="center form">
            <h3>Exp Month</h3>
            <div>
              <input
                className="text"
                type="text"
                name="expMonth"
                value={this.state.expMonth}
                onChange={this.handleChange}
              />
            </div>
          </label>
          <label className="center form">
            <h3>Exp Year</h3>
            <div>
              <input
                className="text"
                type="text"
                name="expYear"
                value={this.state.expYear}
                onChange={this.handleChange}
              />
            </div>
          </label>
          <label className="center form">
            <h3>CVV</h3>
            <div>
              <input
                className="text"
                type="text"
                name="cvv"
                value={this.state.cvv}
                onChange={this.handleChange}
              />
            </div>
          </label>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = (dispatch, ownProps) => {
  return {}
}

// export default connect(mapState, mapDispatch)(ShippingForm);
// export ShippingForm
