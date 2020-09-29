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

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleState = this.handleState.bind(this)
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        if (Object.values(this.state).indexOf('') === -1) {
          this.props.ifFilled('ship', true)
          this.props.checkTax(true, this.state.state)
        }
      }
    )
  }

  handleState(event) {
    this.setState(
      {
        state: event.target.value
      },
      () => {
        if (Object.values(this.state).indexOf('') === -1) {
          this.props.ifFilled('ship', true)
          // const taxRate = Number(this.state.state.slice(3))
          this.props.checkTax(true)
        }
      }
    )
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    const abrStates = [
      ['AL', 0.04],
      ['AK', 0],
      ['AZ', 0.056],
      ['AR', 0.065],
      ['CA', 0.0725],
      ['CO', 0.029],
      ['CT', 0.0635],
      ['DE', 0],
      ['FL', 0.06],
      ['GA', 0.04],
      ['HI', 0.04],
      ['ID', 0.06],
      ['IL', 0.0625],
      ['IN', 0.07],
      ['IA', 0.06],
      ['KS', 0.065],
      ['KY', 0.06],
      ['LA', 0.05],
      ['ME', 0.055],
      ['MD', 0.06],
      ['MA', 0.0625],
      ['MI', 0.06],
      ['MN', 0.06875],
      ['MS', 0.07],
      ['MO', 0.4225],
      ['MT', 0],
      ['NE', 0.55],
      ['NV', 0.0685],
      ['NH', 0],
      ['NJ', 0.06625],
      ['NM', 0.05125],
      ['NY', 0.4],
      ['NC', 0.0475],
      ['ND', 0.05],
      ['OH', 0.0575],
      ['OK', 0.45],
      ['OR', 0],
      ['PA', 0.06],
      ['RI', 0.07],
      ['SC', 0.06],
      ['SD', 0.045],
      ['TN', 0.07],
      ['TX', 0.0625],
      ['UT', 0.0595],
      ['VT', 0.06],
      ['VA', 0.053],
      ['WA', 0.065],
      ['WV', 0.06],
      ['WI', 0.05],
      ['WY', 0.04],
      ['DC', 0.06]
    ]
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
                {/* <select
                  className="submitForm postal"
                  type="text"
                  name="state"
                  value={this.state.state}
                  onChange={this.handleState}
                >
                  {abrStates.map((abr, index) => (
                    <option value={abr} key={index}>
                      {abr[0]}
                    </option>
                  ))}
                </select> */}
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
