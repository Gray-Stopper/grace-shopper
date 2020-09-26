import React, {Component} from 'react'
import {connect} from 'react-redux'

export class ShippingForm extends Component {
  constructor(props) {
    super(props)
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
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        if (Object.values(this.state).indexOf('') === -1) {
          this.props.ifFilled('ship', true)
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
        <h1>Shipping</h1>
        <p>Standard shipping is $5.99, more options coming soon!</p>
        <form onSubmit={this.handleSubmit}>
          <label className="center form">
            <h3>First Name</h3>
            <div>
              <input
                className="text"
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </div>
          </label>
          <label className="center form">
            <h3>Last Name</h3>
            <div>
              <input
                className="text"
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </div>
          </label>
          <label className="center form">
            <h3>Address</h3>
            <div>
              <input
                className="text"
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </div>
          </label>
          <label className="center form">
            <h3>City</h3>
            <div>
              <input
                className="text"
                type="text"
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
              />
            </div>
          </label>
          <label className="center form">
            <h3>Postal Code</h3>
            <div>
              <input
                className="text"
                type="text"
                name="postal"
                value={this.state.postal}
                onChange={this.handleChange}
              />
            </div>
          </label>
          <label className="center form">
            <h3>State</h3>
            <div>
              <input
                className="text"
                type="text"
                name="state"
                value={this.state.state}
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
