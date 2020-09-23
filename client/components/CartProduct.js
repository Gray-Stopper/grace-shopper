import React from 'react'

const CartProduct = props => {
  console.log('props in CartProduct ', props)
  const {name, imageUrl, price} = props.product
  return (
    <div className="cart-product">
      <img className="cart-img" src={imageUrl} />
      <span>{name}</span>
      <br />
      <span>Quantity: {props.product.productsInOrder.quantity}</span>
    </div>
  )
}

export default CartProduct
