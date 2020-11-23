import React, {Component} from 'react'
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
      tax: 0,
      cart: {},
      mounted: false
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
      if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify({}))
      }
      const guestCart = Object.values(JSON.parse(localStorage.getItem('cart')))
      this.setState({
        cart: guestCart
      })
    }
    this.setState({mounted: true})
  }

  async handleAdd(event, productId) {
    event.preventDefault()
    if (this.props.userId) {
      await this.props.addItem({
        productId,
        userId: this.props.userId
      })
    } else {
      await addGuestCartItem(productId)
      const guestCart = Object.values(JSON.parse(localStorage.getItem('cart')))
      this.setState({
        cart: guestCart
      })
    }
  }

  render() {
    if (!this.state.mounted) {
      return null
    } else {
      let cart
      if (this.props.userId) {
        cart = this.props.cart
      } else {
        cart = this.state.cart
      }
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

      return (
        <div className="singleProductPage">
          {product.id && (
            <div className="singleProduct">
              <div className="title-img">
                <h1>{product.name}</h1>
                <img src={product.imageUrl} className="single-img" />
              </div>
              <div className="flex-single">
                <p className="description">{product.description}</p>
                {product.stock > 0 ? (
                  <button
                    type="button"
                    className="clearShort button addItem"
                    onClick={event => {
                      this.handleAdd(event, product.id)
                    }}
                  >
                    Add To Cart - ${product.price}
                  </button>
                ) : (
                  <h4 className="soldOut">sold out</h4>
                )}
              </div>
            </div>
          )}
          <div className="minicart hide">
            <h3 className="formHeader">Your Cart Items</h3>
            <table>
              <tbody>
                {cartProducts.length > 0 ? (
                  cartProducts.map(cartProduct => (
                    <SideCartView key={cartProduct.id} item={cartProduct} />
                  ))
                ) : (
                  <tr>
                    <td className="no-dots">
                      <h4>
                        Your cart is empty!
                        <br />
                        What are you waiting for?
                      </h4>
                    </td>
                  </tr>
                )}
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
        </div>
      )
    }
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
    loadCart: userId => dispatch(loadCart(userId)),
    loadInitialData: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
