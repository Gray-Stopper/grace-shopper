import React, {Component} from 'react'

export class ShippingForm extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      postal: '',
      city: '',
      state: ''
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
          this.props.ifFilled('ship', true)
          this.props.checkTax(true, this.state)
        }
      }
    )
  }

  render() {
    return (
      <div>
        <h1 className="formHeader">Shipping</h1>
        <p className="leftPText">
          Standard shipping is 7-10 business days after order processes.
        </p>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div className="blocks">
            <label className="formBlock">
              <h3 className="textInput">First Name</h3>
              <input
                className="submitForm"
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </label>
            <label className="formBlock">
              <h3 className="textInput">Last Name</h3>
              <div className="blocks">
                <input
                  className="submitForm"
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
            </label>
          </div>
          <label className="formBlock">
            <h3 className="textInput">Address</h3>
            <div className="blocks">
              <input
                className="submitForm address"
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </div>
          </label>
          <div className="blocks">
            <label className="formBlock">
              <h3 className="textInput">City</h3>
              <div className="blocks">
                <input
                  className="submitForm"
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </div>
            </label>
            <label className="formBlock">
              <h3 className="textInput">State</h3>
              <div className="blocks">
                <input
                  className="submitForm postal"
                  type="text"
                  name="state"
                  value={this.state.state}
                  onChange={this.handleChange}
                />
              </div>
            </label>
            <label className="formBlock">
              <h3 className="textInput">Postal Code</h3>
              <div className="blocks">
                <input
                  className="submitForm postal"
                  type="text"
                  name="postal"
                  value={this.state.postal}
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
