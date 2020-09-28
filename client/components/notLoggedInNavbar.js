import React from 'react'
import {Link} from 'react-router-dom'

const NotLoggedInNavbar = props => {
  return (
    <div>
      <div>
        <Link to="/cart">Cart</Link>
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
