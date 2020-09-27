import React from 'react'

export const GuestProduct = props => {
  const {quantity, name, imageUrl, price} = props.product
  return (
    <tr className="cart-product">
      <td>
        <img className="cart-img" src={imageUrl} />
      </td>
      <td>{name}</td>
      <td>{`$${price}`}</td>
      <td>
        {/* <EditCartQuantity
            quantity={this.state.quantity}
            onChange={this.updateState}
          /> */}
      </td>
      <td>{`$${price * quantity}`}</td>
      <td>
        <button
          type="button"
          className="button remove"
          // onClick={() => this.props.remove(event, id)}
        >
          Remove
        </button>
      </td>
    </tr>
  )
}
