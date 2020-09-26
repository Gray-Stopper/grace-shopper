import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers, removeUser, addUser} from '../store/allUsers'
import {UserRow, NewUser} from './index'

class Users extends React.Component {
  constructor() {
    super()
    this.state = {
      newFirstName: '',
      newLastName: '',
      newEmail: '',
      newPassword: '',
      newIsAdmin: false
    }
    this.handleFormInput = this.handleFormInput.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleFormInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async componentDidMount() {
    await this.props.getAllUsers()
  }

  async handleRemove(userId) {
    await this.props.removeUser(userId)
  }

  async handleAdd(event) {
    event.preventDefault()
    if (
      this.state.newFirstName &&
      this.state.newLastName &&
      this.state.newPassword &&
      this.state.newEmail
    ) {
      await this.props.addUser({
        firstName: this.state.newFirstName,
        lastName: this.state.newLastName,
        email: this.state.newEmail,
        isAdmin: this.state.newIsAdmin,
        password: this.state.newPassword
      })
      this.setState({
        newFirstName: '',
        newLastName: '',
        newEmail: '',
        newPassword: '',
        newIsAdmin: false
      })
    }
  }

  render() {
    return (
      <div>
        <h3 className="margin-left">All Registered Customers</h3>
        <table className="cart left">
          <thead className="t-head">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Admin</th>
              <th scope="col" />
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {this.props.users &&
              this.props.users.map(user => {
                return (
                  <UserRow
                    key={user.id}
                    user={user}
                    removeUser={this.handleRemove}
                  />
                )
              })}
          </tbody>
        </table>
        <br />
        <NewUser
          onChange={this.handleFormInput}
          onSubmit={this.handleAdd}
          formInput={this.state}
        />
      </div>
    )
  }
}

const mapState = state => ({
  users: state.allUsers
})

const mapDispatch = dispatch => ({
  getAllUsers: () => dispatch(fetchUsers()),
  removeUser: userId => dispatch(removeUser(userId)),
  addUser: userInfo => dispatch(addUser(userInfo))
})

export default connect(mapState, mapDispatch)(Users)
