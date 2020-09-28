import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store'
import {loadCart, removeItem} from '../store/cart'
import {CartProduct, CartTotal} from './index'

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
          <h3 className="left">
            {this.props.user.firstName
              ? `${this.props.user.firstName}'s Cart`
              : 'Cart'}
          </h3>
          {this.props.cart.id ? (
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
                  {this.props.cart.products &&
                    this.props.cart.products.map(prod => {
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
