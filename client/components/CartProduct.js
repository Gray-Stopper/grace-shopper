import React from 'react'

const CartProduct = props => {
  console.log('props in CartProduct ', props)
  return (
    <div>
      <span>{props.product.name}</span>
      <br />
    </div>
  )
}

export default CartProduct
