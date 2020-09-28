import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store'
import {loadCart, removeItem} from '../store/cart'
import {removeGuestCartItem, updateGuestItemQuantity} from '../store/guestCart'
import {GuestProduct} from './guestcart-product'
import {CartProduct, CartTotal} from './index'

export class GuestCart extends Component {
  constructor() {
    super()
    this.state = {
      products: {}
    }

    this.removeItem = this.removeItem.bind(this)
    this.updateItem = this.updateItem.bind(this)
  }

  componentDidMount() {
    const productObj = JSON.parse(localStorage.getItem('cart'))
    this.setState({
      products: productObj
    })
  }

  removeItem(productName) {
    removeGuestCartItem(productName)
  }

  async updateItem(event, name) {
    const newQuantity = Number(event.target.value)
    updateGuestItemQuantity(name, newQuantity)
    const productObj = JSON.parse(localStorage.getItem('cart'))
    this.setState({
      products: productObj
    })
  }

  render() {
    const productsArr = Object.values(this.state.products)
    return (
      <div>
        <h3 className="left">Guest's Cart</h3>
        {this.state.products ? (
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
                {productsArr.map(prod => {
                  return (
                    <GuestProduct
                      key={prod.id}
                      product={prod}
                      remove={this.removeItem}
                      edit={(event, name) => this.updateItem(event, name)}
                    />
                  )
                })}
              </tbody>
            </table>
            <CartTotal cart={productsArr} />
          </div>
        ) : (
          <p>No items in cart</p>
        )}
      </div>
    )
  }
}

const mapState = state => ({})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(GuestCart)
// export default GuestCart
