import React from 'react'
import {Link} from 'react-router-dom'

const Confirmation = props => {
  return (
    <div>
      <h3 className="textCenter">Purchase is Processing</h3>
      <p>Email confirmation will be sent when your purchase is shipped!</p>
      <Link to="/home" className="checkoutPage">
        <button type="button" className="checkout button checkoutPage">
          Back to Home Page
        </button>
      </Link>
    </div>
  )
}

export default Confirmation
