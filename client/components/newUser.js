import React from 'react'

const NewUser = props => {
  const {
    newFirstName,
    newLastName,
    newIsAdmin,
    newEmail,
    newPassword
  } = props.formInput
  return (
    <>
      <h3 className="margin-left">Add New Customer</h3>
      <div className="form-box">
        <form className="add-new-form" onSubmit={props.onSubmit}>
          <label className="add-label" htmlFor="newFirstName">
            First Name:{' '}
          </label>

          <input
            name="newFirstName"
            type="text"
            className="add-form-field"
            value={newFirstName}
            onChange={props.onChange}
          />

          <label htmlFor="newLastName" className="add-label">
            Last Name:{' '}
          </label>

          <input
            className="add-form-field"
            name="newLastName"
            type="text"
            value={newLastName}
            onChange={props.onChange}
          />
          <br />

          <label htmlFor="newEmail" className="add-label">
            Email:{' '}
          </label>

          <input
            className="add-form-field"
            name="newEmail"
            type="text"
            size="65"
            value={newEmail}
            onChange={props.onChange}
          />
          <br />

          <label htmlFor="newPassword" className="add-label">
            Password:{' '}
          </label>

          <input
            className="add-form-field"
            name="newPassword"
            type="text"
            value={newPassword}
            onChange={props.onChange}
          />

          <label htmlFor="newIsAdmin" className="add-label">
            Admin:
          </label>
          <div className="no-margin">
            <input
              className="add-form-field"
              value={true}
              name="newIsAdmin"
              type="radio"
              onChange={props.onChange}
              checked={newIsAdmin === true || newIsAdmin === 'true'}
            />
            Yes{'   '}
            <input
              className="add-form-field"
              value={false}
              name="newIsAdmin"
              type="radio"
              onChange={props.onChange}
              checked={newIsAdmin === false || newIsAdmin === 'false'}
            />
            No
          </div>
          <br />
          <button type="submit" className="button add dash">
            Add Customer
          </button>
        </form>
      </div>
    </>
  )
}

export default NewUser
