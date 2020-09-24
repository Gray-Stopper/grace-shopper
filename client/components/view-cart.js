import React from 'react'
import {connect} from 'react-redux'
import {loadCart} from '../store/cart'
import {CartProduct, CartTotal} from './index'

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
        {this.props.cart.products ? (
          <div>
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
              <tbody>
                {this.props.cart.products.map(prod => {
                  return <CartProduct key={prod.id} product={prod} />
                })}
              </tbody>
            </table>
            <CartTotal cart={this.props.cart} />
          </div>
        ) : (
          <p>No items in cart</p>
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
