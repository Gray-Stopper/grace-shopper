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
        <h3 className="left">Cart</h3>
        <table className="cart left">
          <thead className="t-head">
            <tr>
              <th />
              <th scope="col">Item</th>
              <th scope="col">Item Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price</th>
              <th />
            </tr>
          </thead>
          {this.props.cart.products ? (
            <tbody>
              {this.props.cart.products.map(prod => {
                return <CartProduct key={prod.id} product={prod} />
              })}
            </tbody>
          ) : (
            // <tbody>
            //   <tr>Your cart is empty!</tr>
            // </tbody>
            <tbody />
          )}
        </table>
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
