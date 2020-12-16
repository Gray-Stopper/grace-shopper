import React from 'react'
import {NavLink} from 'react-router-dom'

const NotLoggedInNavbar = props => {
  return (
    <div>
      <div className="flex">
        <NavLink to="/cart" className="nav-link" activeClassName="active-link">
          Cart
        </NavLink>
        <button
          type="button"
          className="button nav"
          onClick={() => {
            props.handleLoginClick()
          }}
        >
          Login
        </button>
        <button
          type="button"
          className="button nav"
          onClick={() => {
            props.handleSignUpClick()
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default NotLoggedInNavbar
