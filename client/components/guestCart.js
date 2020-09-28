import React, {Component} from 'react'
import {removeGuestCartItem, updateGuestItemQuantity} from '../store/guestCart'
import {GuestCartProduct} from './guestCartProduct'
import {CartTotal} from './index'
import {Cart} from './Cart'

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
    const productObj = JSON.parse(localStorage.getItem('cart'))
    this.setState({
      products: productObj
    })
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
    const cart = this.state.products || []
    const productsArr = Object.values(cart)
    return (
      <div>
        <h3 className="left">Guest's Cart</h3>
        <Cart cart={productsArr} handleRemove={this.removeItem} />
        {/* {productsArr.length > 0 ? (
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
                    <GuestCartProduct
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
        )} */}
      </div>
    )
  }
}

export default GuestCart
