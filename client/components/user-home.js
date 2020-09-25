import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, firstName} = props

  return (
    <div>
      {email ? (
        <div>
          {' '}
          <h3>Welcome, {firstName ? firstName : email}</h3>{' '}
        </div>
      ) : (
        ''
      )}
      <div className="homeImage">
        <p className="tagline">A virtual spa for your aging head</p>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
