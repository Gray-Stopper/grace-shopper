import React from 'react'

const EditProduct = props => {
  const {
    editImageUrl,
    editDescription,
    editName,
    editStock,
    editPrice
  } = props.formInput
  return (
    <>
      <h3 className="margin-left">Edit Product</h3>
      <span className="margin-left">
        All edited products must include a <b>name</b>, <b>price</b>,{' '}
        <b>stock amount</b> and <b>category</b>.
      </span>
      <div className="form-box">
        <form className="add-new-form" onSubmit={props.onSubmit}>
          <label className="add-label" htmlFor="editName">
            Name:{' '}
          </label>

          <input
            name="editName"
            type="text"
            className="add-form-field"
            size="37"
            value={editName}
            onChange={props.onChange}
          />

          <label htmlFor="editStock" className="add-label">
            Stock:{' '}
          </label>

          <input
            className="add-form-field"
            name="editStock"
            type="number"
            value={editStock}
            onChange={props.onChange}
          />
          <br />

          <label htmlFor="editImageUrl" className="add-label">
            Image URL:{' '}
          </label>

          <input
            className="add-form-field"
            name="editImageUrl"
            type="text"
            size="120"
            value={editImageUrl}
            onChange={props.onChange}
          />
          <br />

          <label htmlFor="editDescription" className="add-label">
            Description:{' '}
          </label>

          <input
            className="add-form-field"
            name="editDescription"
            type="text"
            size="120"
            value={editDescription}
            onChange={props.onChange}
          />
          <br />

          <label htmlFor="editPrice" className="add-label">
            Price:{' '}
          </label>

          <input
            className="add-form-field"
            name="editPrice"
            type="number"
            value={editPrice}
            onChange={props.onChange}
          />

          <label htmlFor="editCategory" className="add-label category">
            Category:
          </label>

          <select
            name="editCategory"
            className="cart-select add-select"
            value={props.editCategory}
            onChange={props.onChange}
          >
            <option value="color">Color</option>
            <option value="nutrition">Nutrition</option>
            <option value="wigs">Wigs</option>
          </select>

          <br />
          <button type="submit" className="button edit dash">
            Edit Product
          </button>
        </form>
      </div>
    </>
  )
}

export default EditProduct
