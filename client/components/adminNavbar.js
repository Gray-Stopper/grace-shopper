import React from 'react'
import {Link} from 'react-router-dom'

const AdminNavbar = props => {
  return (
    <div className="inline">
      <Link to="/productDashboard">Product Dashboard</Link>
      <Link to="/users">User Dashboard</Link>
      <a to="/" href="#" onClick={props.handleClick}>
        Logout
      </a>
    </div>
  )
}

export default AdminNavbar
