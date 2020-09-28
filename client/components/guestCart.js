import React, {Component} from 'react'
import {removeGuestCartItem, updateGuestItemQuantity} from '../store/guestCart'
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
        <Cart
          cart={productsArr}
          handleRemove={this.removeItem}
          edit={this.updateItem}
        />
      </div>
    )
  }
}

export default GuestCart
