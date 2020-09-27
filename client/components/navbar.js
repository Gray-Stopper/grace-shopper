import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import {emptyCart} from '../store/cart'
import {Login, Signup} from './auth-form'

class Navbar extends React.Component {
  constructor(props) {
    super()
    this.state = {
      showLoginForm: false,
      showSignUpForm: false
    }
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleSignUpClick = this.handleSignUpClick.bind(this)
  }

  handleLoginClick() {
    this.setState(prevState => ({
      showLoginForm: !prevState.showLoginForm,
      showSignUpForm: false
    }))
  }

  handleSignUpClick() {
    this.setState(prevState => ({
      showSignUpForm: !prevState.showSignUpForm,
      showLoginForm: false
    }))
  }

  render() {
    return (
      <div>
        <div className="header">
          <NavLink to="/products" className="link">
            All Products
          </NavLink>
          <Link to="/home" className="link">
            <h2 className="logo">GRAY STOPPER</h2>
          </Link>
          <nav>
            {this.props.isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                {/* <Link to="/home">Home</Link> */}
                <Link to="/cart">Cart</Link>
                <a to="/" href="#" onClick={this.props.handleClick}>
                  Logout
                </a>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <button
                  type="button"
                  onClick={() => {
                    this.handleLoginClick()
                  }}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.handleSignUpClick()
                  }}
                >
                  Sign Up
                </button>
                <Link to="/guestCart">Cart</Link>
              </div>
            )}
          </nav>
        </div>
        {/* <h4>A virtual spa for your aging head</h4> */}
        {!this.props.isLoggedIn && this.state.showLoginForm ? <Login /> : ''}
        {!this.props.isLoggedIn && this.state.showSignUpForm ? <Signup /> : ''}
        {/* <hr /> */}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(emptyCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
