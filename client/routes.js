import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  UserHome,
  ViewCart,
  AllProducts,
  Checkout,
  Confirmation,
  Users,
  GuestCart,
  SingleProduct,
  ProductDashboard
} from './components'
import {me} from './store'

class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
  }

  render() {
    const {isAdmin, isLoggedIn} = this.props
    return (
      <Switch>
        {isAdmin && (
          <Switch>
            <Route exact path="/" component={UserHome} />
            <Route path="/home" component={UserHome} />
            <Route path="/productDashboard" component={ProductDashboard} />
            <Route path="/userDashboard" component={Users} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="*" component={UserHome} />
          </Switch>
        )}
        {isLoggedIn &&
          !isAdmin && (
            <Switch>
              <Route exact path="/" component={UserHome} />
              <Route path="/home" component={UserHome} />
              <Route exact path="/products" component={AllProducts} />
              <Route path="/products/:productId" component={SingleProduct} />
              <Route path="/cart" component={ViewCart} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/confirmation" component={Confirmation} />
              <Route path="*" component={UserHome} />
            </Switch>
          )}
        {!isLoggedIn && (
          <Switch>
            <Route exact path="/" component={UserHome} />
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/confirmation" component={Confirmation} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route exact path="/cart" component={GuestCart} />
            <Route path="*" component={UserHome} />
          </Switch>
        )}
        <Route path="*" component={UserHome} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
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

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired
}
