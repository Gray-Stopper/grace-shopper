import React from 'react'
import {EditCartQuantity} from './index'
import {editQuantity} from '../store/cart'
import {connect} from 'react-redux'

class CartProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: ''
    }
    this.updateState = this.updateState.bind(this)
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.product.productsInOrder.quantity
    })
  }

  updateState(event) {
    this.setState(
      {
        quantity: event.target.value
      },
      () => {
        this.handleQuantityChange()
      }
    )
  }

  async handleQuantityChange() {
    if (this.state.quantity !== '') {
      await this.props.updateQuantity({
        userId: this.props.userId,
        orderId: this.props.orderId,
        productId: this.props.product.id,
        quantity: Number(this.state.quantity)
      })
    }
  }

  render() {
    const {id, name, imageUrl, price} = this.props.product
    const totalPrice = Math.round(price * this.state.quantity * 100) / 100
    return (
      <tr className="cart-product">
        <td>
          <img className="cart-img" src={imageUrl} />
        </td>
        <td>{name}</td>
        <td>{`$${price}`}</td>
        <td>
          <EditCartQuantity
            quantity={this.state.quantity}
            onChange={this.updateState}
          />
        </td>
        <td>{`$${totalPrice}`}</td>
        <td>
          <button
            type="button"
            className="button remove"
            onClick={() => this.props.remove(event, id)}
          >
            Remove
          </button>
        </td>
      </tr>
    )
  }
}

const mapDispatch = dispatch => ({
  updateQuantity: idObj => dispatch(editQuantity(idObj))
})

export default connect(null, mapDispatch)(CartProduct)
