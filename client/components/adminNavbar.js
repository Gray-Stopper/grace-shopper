import React from 'react'
import {NavLink} from 'react-router-dom'

const AdminNavbar = props => {
  return (
    <div className="inline">
      <NavLink
        activeClassName="active-link"
        className="link"
        to="/productDashboard"
      >
        Product Dashboard
      </NavLink>
      <NavLink
        activeClassName="active-link"
        className="link"
        to="/userDashboard"
      >
        User Dashboard
      </NavLink>
      <NavLink
        activeClassName="active-link"
        className="link"
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
