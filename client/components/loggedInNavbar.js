import React from 'react'
import {Link} from 'react-router-dom'

const LoggedInNavbar = props => {
  return (
    <div className="inline">
      <Link to="/cart">Cart</Link>
      <a to="/" href="#" onClick={props.handleClick}>
        Logout
      </a>
    </div>
  )
}

export default LoggedInNavbar
