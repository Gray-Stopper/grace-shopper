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

  async

  async componentDidMount() {
    const userId = this.props.user.id
    if (userId) {
      await this.props.loadCart(userId)
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h3 className="left">
          {this.props.user ? `${this.props.user.firstName}'s Cart` : 'Cart'}
        </h3>
        {this.props.cart ? (
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
                      userId={this.props.user.id}
                      orderId={this.props.cart.id}
                      remove={this.handleRemove}
                    />
                  )
                })}
              </tbody>
            </table>
            {this.props.cart && <CartTotal cart={this.props.cart} />}
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
