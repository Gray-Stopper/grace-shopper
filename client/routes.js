import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  UserHome,
  ViewCart,
  AllProducts,
  Checkout,
  Confirmation,
  Users,
  GuestCart,
  SingleProduct
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
  }

  render() {
    const {isAdmin} = this.props
    console.log('isAdmin: ', this.props.isAdmin)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/home" component={UserHome} />
        <Route exact path="/cart" component={ViewCart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Route exact path="/products/:productId" component={SingleProduct} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/guestCart" component={GuestCart} />
        {isAdmin && (
          <Switch>
            <Route path="/users" component={Users} />
          </Switch>
        )}
        {/* <Route component={UserHome} /> */}

        <Redirect from="/" to="/home" component={UserHome} />

        {/* <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} /> */}
        {/* {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
        {/* <Route path="/home" component={UserHome} />
          </Switch> */}
        {/* )} */}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    user: state.user,
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
