import React from 'react'

const EditUser = props => {
  const {editFirstName, editLastName, editIsAdmin, editEmail} = props.formInput
  return (
    <div>
      <h3 className="margin-left">Edit Customer</h3>
      <form className="add-new-form" onSubmit={props.onSubmit}>
        <label className="add-label" htmlFor="editFirstName">
          First Name:{' '}
        </label>

        <input
          name="editFirstName"
          type="text"
          className="add-form-field"
          value={editFirstName}
          onChange={props.onChange}
        />

        <label htmlFor="editLastName" className="add-label">
          Last Name:{' '}
        </label>

        <input
          className="add-form-field"
          name="editLastName"
          type="text"
          value={editLastName}
          onChange={props.onChange}
        />
        <br />

        <label htmlFor="editEmail" className="add-label">
          Email:{' '}
        </label>

        <input
          className="add-form-field"
          name="editEmail"
          type="text"
          value={editEmail}
          onChange={props.onChange}
        />

        <label htmlFor="editIsAdmin" className="add-label">
          Admin:
        </label>
        <div>
          <input
            className="add-form-field"
            value={true}
            name="editIsAdmin"
            type="radio"
            onChange={props.onChange}
            checked={editIsAdmin === true || editIsAdmin === 'true'}
          />
          Yes{'   '}
          <input
            className="add-form-field"
            value={false}
            name="newIsAdmin"
            type="radio"
            onChange={props.onChange}
            checked={editIsAdmin === false || editIsAdmin === 'false'}
          />
          No
        </div>

        <button type="submit" className="button edit">
          Edit Customer
        </button>
      </form>
    </div>
  )
}

export default EditUser
