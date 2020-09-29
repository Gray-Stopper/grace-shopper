import React from 'react'

const ProductRow = props => {
  const {imageUrl, name, id, price, category, stock} = props.product
  return (
    <tr>
      <td>
        <img src={imageUrl} className="dash-img" />
      </td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{category}</td>
      <td>{`$${price}`}</td>
      <td>{stock}</td>
      <td>
        <button
          type="button"
          className="button edit"
          onClick={() => props.showEdit(id)}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          className="button remove"
          onClick={() => props.removeProduct(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default ProductRow
