import React, {Component} from 'react'

export class PaymentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvv: ''
    }
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

  render() {
    return (
      <div>
        <h1 className="formHeader">Payment</h1>
        <hr />
        <form className="payMargin">
          <label className="formBlock">
            <h3 className="textInput">Card Number</h3>
            <input
              className="submitForm"
              type="text"
              name="cardNumber"
              value={this.state.cardNumber}
              onChange={this.handleChange}
            />
          </label>
          <div className="blocks">
            <label className="formBlock">
              <h3 className="textInput">Exp Month</h3>
              <div className="blocks">
                <input
                  className="submitForm numbers"
                  type="text"
                  name="expMonth"
                  value={this.state.expMonth}
                  onChange={this.handleChange}
                />
              </div>
            </label>
            <label className="formBlock">
              <h3 className="textInput">Exp Year</h3>
              <div className="blocks">
                <input
                  className="submitForm numbers"
                  type="text"
                  name="expYear"
                  value={this.state.expYear}
                  onChange={this.handleChange}
                />
              </div>
            </label>
            <label className="formBlock">
              <h3 className="textInput">CVV</h3>
              <div className="blocks">
                <input
                  className="submitForm numbers"
                  type="text"
                  name="cvv"
                  value={this.state.cvv}
                  onChange={this.handleChange}
                />
              </div>
            </label>
          </div>
        </form>
      </div>
    )
  }
}
