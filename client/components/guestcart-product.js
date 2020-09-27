import React from 'react'
import {default as EditCartQuantity} from './edit-cart-quantity'

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
        <EditCartQuantity
          quantity={quantity}
          onChange={event => props.edit(event, name)}
        />
      </td>
      <td>{`$${price * quantity}`}</td>
      <td>
        <button
          type="button"
          className="button remove"
          onClick={() => props.remove(name)}
        >
          Remove
        </button>
      </td>
    </tr>
  )
}
