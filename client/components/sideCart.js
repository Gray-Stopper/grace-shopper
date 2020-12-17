import React from 'react'
import {Link} from 'react-router-dom'

const SideCart = () => {
  return (
    <div className="sideCart collapse" id="navbarToggleExternalContent">
      <button
        className="navbar-toggler-edit"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        X
      </button>
      <div className="bg-675264 p-4 white leftPText">
        <p className="leftPText">
          <Link to="/products" className="nav-link white">
            Shop All
          </Link>
        </p>
        <p className="leftPText">
          <Link to="" className="nav-link white">
            Color Poppers
          </Link>
        </p>
        <p className="leftPText">
          <Link to="" className="nav-link white">
            Hair Toppers
          </Link>
        </p>
        <p className="leftPText">
          <Link to="" className="nav-link white">
            Wellness Shoppers
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SideCart
