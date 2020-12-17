import React from 'react'
import {NavLink} from 'react-router-dom'

const AdminNavbar = props => {
  return (
    <div className="flex">
      <NavLink
        activeClassName="active-link"
        className="nav-link"
        to="/productDashboard"
      >
        Product Dashboard
      </NavLink>
      <NavLink
        activeClassName="active-link"
        className="nav-link"
        to="/userDashboard"
      >
        User Dashboard
      </NavLink>
      <NavLink
        activeClassName="active-link"
        className="nav-link"
        exact
        to="/logout"
        onClick={props.handleClick}
      >
        Logout
      </NavLink>
    </div>
  )
}

export default AdminNavbar
