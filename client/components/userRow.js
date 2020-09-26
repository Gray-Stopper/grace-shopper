import React from 'react'

const UserRow = props => {
  const {id, email, firstName, lastName, isAdmin} = props.user
  return (
    <tr>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{isAdmin ? 'Yes' : 'No'}</td>
      <td>
        <button type="button" className="button edit">
          Edit User
        </button>
      </td>
      <td>
        <button
          type="button"
          className="button remove"
          onClick={() => props.removeUser(id)}
        >
          Remove User
        </button>
      </td>
    </tr>
  )
}

export default UserRow
