import React, {Component} from 'react'
import Product from './product'
import {Link} from 'react-router-dom'
import {fetchProduct} from '../store/product'
import {addItemThunk, loadCart} from '../store/cart'
import {addGuestCartItem} from '../store/guestCart'
import {connect} from 'react-redux'
import {SideCartView} from './sideCartView'
import {me} from '../store'

class SingleProduct extends Component {
  constructor() {
    super()
    this.handleAdd = this.handleAdd.bind(this)
    this.state = {
      tax: 0
    }
  }

  async componentDidMount() {
    const productId = this.props.match.params.productId
    await this.props.get(productId)
    if (!this.props.userId) {
      await this.props.loadInitialData()
    }
    if (this.props.userId) {
      await this.props.loadCart(this.props.userId)
    } else {
      // const productObj = JSON.parse(localStorage.getItem('cart'))
    }
  }

  async handleAdd(event, productId) {
    event.preventDefault()
    if (this.props.userId) {
      await this.props.addItem({
        productId,
        userId: this.props.userId
      })
    } else {
      this.props.addGuestItem(productId)
    }
  }

  render() {
    const cart = this.props.cart
    let cartProducts = cart.products
    if (Array.isArray(cart)) {
      cartProducts = cart
    }

    const calPrice = cartProducts.reduce((acc, val) => {
      let orderQuantity
      if (!val.productsInOrder) {
        orderQuantity = val.quantity
      } else {
        orderQuantity = val.productsInOrder.quantity
      }
      return acc + val.price * orderQuantity
    }, 0)
    const subtotal = Math.round(calPrice * 100) / 100

    const calTax = Math.round(subtotal * this.state.tax * 100) / 100
    const tax = this.state.tax !== 0 ? `$${calTax}` : 'TBD'

    const total = Math.round((subtotal + 5.99 + calTax) * 100) / 100
    const product = this.props.product

    console.log('cartProducts: ', cartProducts)

    return (
      <>
        <div id="single-product">
          {product.id && (
            <div className="singleProduct">
              <h1>{product.name}</h1>
              <img src={product.imageUrl} width="400" height="400" />
              {product.stock > 0 ? (
                <button
                  type="button"
                  className="clear button"
                  onClick={() => {
                    this.handleAdd(event, product.id)
                  }}
                >
                  Add To Cart - ${product.price}
                </button>
              ) : (
                <h4 className="soldOut">sold out</h4>
              )}
              <p>{product.description}</p>
            </div>
          )}
        </div>
        <div className="checkoutPageChildren">
          <h3 className="formHeader">Cart Items</h3>
          <table>
            <tbody>
              {cartProducts.map(cartProduct => (
                <SideCartView key={cartProduct.id} item={cartProduct} />
              ))}
            </tbody>
          </table>
          <div>
            <table className="total">
              <tbody>
                <tr>
                  <td className="bold rowSpaces">Subtotal</td>
                  <td className="rightAdjust">{`$${subtotal}`}</td>
                </tr>
                <tr>
                  <td className="bold">Tax</td>
                  <td className="rightAdjust">{tax}</td>
                </tr>
                <tr>
                  <td className="bold">Shipping</td>
                  <td className="rightAdjust">$5.99</td>
                </tr>
                <tr>
                  <td className="bold">Total</td>
                  <td className="rightAdjust">{`$${total}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct,
    userId: state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    get: productId => {
      dispatch(fetchProduct(productId))
    },
    addItem: product => {
      dispatch(addItemThunk(product))
    },
    addGuestItem: productId => {
      dispatch(addGuestCartItem(productId))
    },
    loadCart: userId => dispatch(loadCart(userId)),
    loadInitialData: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
