import React from 'react'
import {connect} from 'react-redux'
import {loadCart, removeItem} from '../store/cart'
import {CartProduct, CartTotal} from './index'

class ViewCart extends React.Component {
  constructor() {
    super()
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
                  return (
                    <CartProduct
                      key={prod.id}
                      product={prod}
                      remove={this.handleRemove}
                    />
                  )
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
  loadCart: userId => dispatch(loadCart(userId)),
  removeItem: idObj => dispatch(removeItem(idObj))
})

export default connect(mapState, mapDispatch)(ViewCart)
