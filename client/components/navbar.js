import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import {emptyCart} from '../store/cart'
import {Login, Signup} from './authForm'
import {AdminNavbar, NotLoggedInNavbar, LoggedInNavbar} from './index'
import SideCart from './menuCart'

class Navbar extends React.Component {
  constructor() {
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

  // eslint-disable-next-line complexity
  render() {
    return (
      <>
        <div className="header">
          {/* <NavLink
            to="/products"
            activeClassName="active-link"
            className="nav-link"
          >
            Shop All Products
          </NavLink> */}
          <nav className="navbar navbar-light bg-eeebe7">
            <div className="container-fluid">
              <button
                className="navbar-toggler-edit"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarToggleExternalContent"
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
            </div>
          </nav>
          <Link to="/home" className="nav-link">
            <h2 className="logo">GRAY STOPPER</h2>
          </Link>
          <nav className="">
            {/* The navbar will show these links after you log in as an admin */}
            {this.props.isAdmin && (
              <AdminNavbar handleClick={this.props.handleClick} />
            )}
            {/* The navbar will show these links after you log in, not as an admin */}
            {this.props.isLoggedIn &&
              !this.props.isAdmin && (
                <LoggedInNavbar
                  handleLoginClick={this.handleLoginClick}
                  handleClick={this.props.handleClick}
                />
              )}
            {/* The navbar will show these links before you log in */}
            {!this.props.isLoggedIn && (
              <NotLoggedInNavbar
                handleLoginClick={this.handleLoginClick}
                handleSignUpClick={this.handleSignUpClick}
                handleClick={this.props.handleClick}
              />
            )}
          </nav>
        </div>
        <div>
          {!this.props.isLoggedIn && this.state.showLoginForm && <Login />}
          {!this.props.isLoggedIn && this.state.showSignUpForm && <Signup />}
        </div>
      </>
    )
  }
}

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

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
