import React from 'react'

const UserRow = props => {
  const {id, email, firstName, lastName} = props.user
  return (
    <tr>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
    </tr>
  )
}

export default UserRow
