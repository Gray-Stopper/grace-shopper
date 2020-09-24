import React from 'react'

const CartProduct = props => {
  const {name, imageUrl, price} = props.product
  const quantity = props.product.productsInOrder.quantity
  return (
    <tr className="cart-product">
      <td>
        <img className="cart-img" src={imageUrl} />
      </td>
      <td>{name}</td>
      <td>{`$${price}`}</td>
      <td>{quantity}</td>
      <td>{`$${price * quantity}`}</td>
      <td>
        <button
          type="button"
          className="button remove"
          onClick={() => props.remove}
        >
          Remove
        </button>
      </td>
    </tr>
  )
}

export default CartProduct
