import React from 'react'
import {connect} from 'react-redux'
import {loadCart} from '../store/cart'
import CartProduct from './CartProduct'

class ViewCart extends React.Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const userId = this.props.user.id
    if (userId) await this.props.loadCart(userId)
  }

  render() {
    return (
      <div>
        {this.props.cart.products ? (
          <div>
            {this.props.cart.products.map(prod => {
              return <CartProduct key={prod.id} product={prod} />
            })}
          </div>
        ) : (
          <p>Your cart is empty!</p>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatch = dispatch => ({
  loadCart: userId => dispatch(loadCart(userId))
})

export default connect(mapState, mapDispatch)(ViewCart)
