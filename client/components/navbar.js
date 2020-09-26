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
    const users = this.props.isAdmin ? <Link to="/users">Users</Link> : ''
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
                <Link to="/home">Home</Link>
                <Link to="/cart">Cart</Link>
                {users}
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
                <Link to="/cart">Cart</Link>
              </div>
            )}
          </nav>
        </div>
        {!this.props.isLoggedIn && this.state.showLoginForm ? <Login /> : ''}
        {!this.props.isLoggedIn && this.state.showSignUpForm ? <Signup /> : ''}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
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
