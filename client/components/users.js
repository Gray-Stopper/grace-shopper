import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/allUsers'
import {UserRow} from './index'

class Users extends React.Component {
  async componentDidMount() {
    await this.props.getAllUsers(this.props.user)
  }

  render() {
    return (
      <div>
        <h3>All Registered Customers</h3>
        <table className="cart left">
          <thead className="t-head">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users &&
              this.props.users.map(user => {
                return <UserRow key={user.id} user={user} />
              })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => ({
  users: state.allUsers,
  user: state.user
})

const mapDispatch = dispatch => ({
  getAllUsers: user => dispatch(fetchUsers(user))
})

export default connect(mapState, mapDispatch)(Users)
