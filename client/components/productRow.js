import React from 'react'

const ProductRow = props => {
  const {imageUrl, name, id, category, stock} = props.product
  return (
    <tr>
      <td>
        <img src={imageUrl} className="dash-img" />
      </td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{category}</td>
      <td>{stock}</td>
      {/* <td>
        <button
          type="button"
          className="button edit"
          onClick={() => props.showEdit(id)}
        >
          Edit Customer
        </button>
      </td> */}
      <td>
        <button
          type="button"
          className="button remove"
          onClick={() => props.removeProduct(id)}
        >
          Delete Product
        </button>
      </td>
    </tr>
  )
}

export default ProductRow
