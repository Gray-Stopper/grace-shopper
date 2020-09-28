import React from 'react'

const NewProduct = props => {
  const {
    newImageUrl,
    newDescription,
    newName,
    newStock,
    newPrice
  } = props.formInput
  return (
    <>
      <h3 className="margin-left">Add New Product</h3>
      <span className="margin-left">
        New products must include a <b>name</b>, <b>price</b> and{' '}
        <b>category</b>.
      </span>
      <div className="form-box">
        <form className="add-new-form" onSubmit={props.onSubmit}>
          <label className="add-label" htmlFor="newName">
            Name:{' '}
          </label>

          <input
            name="newName"
            type="text"
            className="add-form-field"
            size="37"
            value={newName}
            onChange={props.onChange}
          />

          <label htmlFor="newStock" className="add-label">
            Stock:{' '}
          </label>

          <input
            className="add-form-field"
            name="newStock"
            type="number"
            value={newStock}
            onChange={props.onChange}
          />
          <br />

          <label htmlFor="newImageUrl" className="add-label">
            Image URL:{' '}
          </label>

          <input
            className="add-form-field"
            name="newImageUrl"
            type="text"
            size="120"
            value={newImageUrl}
            onChange={props.onChange}
          />
          <br />

          <label htmlFor="newDescription" className="add-label">
            Description:{' '}
          </label>

          <input
            className="add-form-field"
            name="newDescription"
            type="text"
            size="120"
            value={newDescription}
            onChange={props.onChange}
          />
          <br />

          <label htmlFor="newPrice" className="add-label">
            Price:{' '}
          </label>

          <input
            className="add-form-field"
            name="newPrice"
            type="number"
            value={newPrice}
            onChange={props.onChange}
          />

          <label htmlFor="newCategory" className="add-label category">
            Category:
          </label>

          <select
            name="newCategory"
            className="cart-select add-select"
            value={props.newCategory}
            onChange={props.onChange}
          >
            <option>Choose a category...</option>
            <option value="color">Color</option>
            <option value="nutrition">Nutrition</option>
            <option value="wigs">Wigs</option>
          </select>

          <br />
          <button type="submit" className="button add dash">
            Add Product
          </button>
        </form>
      </div>
    </>
  )
}

export default NewProduct
