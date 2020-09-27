import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store'
import {loadCart, removeItem} from '../store/cart'
import {GuestProduct} from './guestcart-product'
import {CartProduct, CartTotal} from './index'

export class GuestCart extends Component {
  constructor() {
    super()
    this.state = {
      products: {}
    }
    this.isFilled = this.isFilled.bind(this)
  }

  componentDidMount() {
    const productObj = JSON.parse(localStorage.getItem('cart'))
    this.setState({
      products: productObj
    })
    console.log('productObj', productObj)
  }

  isFilled() {
    const productObj = JSON.parse(localStorage.getItem('cart'))
    this.setState({
      products: productObj
    })
  }

  render() {
    const productsArr = Object.values(this.state.products)
    console.log(productsArr)
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
                      // userId={this.props.user.id}
                      // orderId={this.props.cart.id}
                      // remove={this.handleRemove}
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
