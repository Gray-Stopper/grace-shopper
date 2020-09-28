import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store'
import {loadCart, removeItem} from '../store/cart'
import {CartProduct, CartTotal} from './index'
import {GuestCart} from './guestCart'
import {Cart} from './Cart'

class ViewCart extends React.Component {
  constructor() {
    super()
    this.state = {
      mounted: false
    }
    this.handleRemove = this.handleRemove.bind(this)
  }

  async handleRemove(event, productId) {
    event.preventDefault()
    await this.props.removeItem({
      productId,
      userId: this.props.user.id,
      orderId: this.props.cart.id
    })
  }

  async componentDidMount() {
    if (!this.props.user.id) {
      await this.props.loadInitialData()
    }
    if (this.props.user.id) {
      await this.props.loadCart(this.props.user.id)
    }
    this.setState({mounted: true})
  }

  render() {
    if (!this.state.mounted) {
      return null
    } else {
      return (
        <div>
          <h3 className="left">{this.props.user.firstName}'s Cart</h3>
          <Cart
            cart={this.props.cart}
            user={this.props.user}
            handleRemove={this.props.handleRemove}
          />
        </div>
      )
    }
  }
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  loadCart: userId => dispatch(loadCart(userId)),
  removeItem: idObj => dispatch(removeItem(idObj))
})

export default connect(mapState, mapDispatch)(ViewCart)
