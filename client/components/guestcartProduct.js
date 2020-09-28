import React from 'react'
import {default as EditCartQuantity} from './editCartQuantity'

export const GuestProduct = props => {
  const {quantity, name, imageUrl, price} = props.product
  const totalPrice = Math.round(price * quantity * 100) / 100
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
      <td>{`$${totalPrice}`}</td>
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
