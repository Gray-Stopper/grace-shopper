import React from 'react'

export const SideCartView = props => {
  const product = props.item
  let amount = product
  if (product.productsInOrder) {
    amount = product.productsInOrder
  }
  return (
    <tr>
      <td className="foot">
        <img src={product.imageUrl} className="pay-img" />
      </td>
      <td className="foot longName">{product.name}</td>
      <td className="foot">x{amount.quantity}</td>
    </tr>
  )
}
