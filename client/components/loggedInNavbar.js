import React from 'react'
import {NavLink} from 'react-router-dom'

const LoggedInNavbar = props => {
  return (
    <div className="flex">
      <NavLink className="nav-link" activeClassName="active-link" to="/cart">
        Cart
      </NavLink>
      <NavLink
        to="/logout"
        className="nav-link"
        activeClassName="active-link"
        onClick={props.handleClick}
      >
        Logout
      </NavLink>
    </div>
  )
}

export default LoggedInNavbar
