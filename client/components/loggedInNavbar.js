import React from 'react'
import {NavLink} from 'react-router-dom'

const LoggedInNavbar = props => {
  return (
    <div className="inline">
      <NavLink className="link" activeClassName="active-link" to="/cart">
        Cart
      </NavLink>
      <NavLink
        to="/logout"
        className="link"
        activeClassName="active-link"
        onClick={props.handleClick}
      >
        Logout
      </NavLink>
    </div>
  )
}

export default LoggedInNavbar
