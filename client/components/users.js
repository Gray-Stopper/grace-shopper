import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers, removeUser, addUser, editUser} from '../store/allUsers'
import {UserRow, NewUser, EditUser} from './index'

class Users extends React.Component {
  constructor() {
    super()
    this.state = {
      newFirstName: '',
      newLastName: '',
      newEmail: '',
      newPassword: '',
      newIsAdmin: false,
      showEdit: false,
      editId: '',
      editFirstName: '',
      editLastName: '',
      editEmail: '',
      editIsAdmin: false
    }
    this.handleFormInput = this.handleFormInput.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.showEdit = this.showEdit.bind(this)
  }

  handleFormInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async componentDidMount() {
    await this.props.getAllUsers()
  }

  showEdit(id) {
    const [userToEdit] = this.props.users.filter(aUser => aUser.id === id)
    console.log('user to edit: ', userToEdit)
    this.setState({
      showEdit: true,
      editId: id,
      editFirstName: userToEdit.firstName,
      editLastName: userToEdit.lastName,
      editEmail: userToEdit.email,
      editIsAdmin: userToEdit.isAdmin
    })
    console.log(this.state)
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

  async handleEdit(event) {
    event.preventDefault()
    if (
      this.state.editFirstName &&
      this.state.editLastName &&
      this.state.editEmail
    ) {
      await this.props.editUser({
        id: this.state.editId,
        firstName: this.state.editFirstName,
        lastName: this.state.editLastName,
        email: this.state.editEmail,
        isAdmin: this.state.editIsAdmin
      })
      this.setState({
        showEdit: false,
        editFirstName: '',
        editLastName: '',
        editEmail: '',
        editIsAdmin: false
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
              this.props.users.sort((a, b) => a.id - b.id).map(user => {
                return (
                  <UserRow
                    key={user.id}
                    user={user}
                    showEdit={this.showEdit}
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
        {this.state.showEdit && (
          <EditUser
            onChange={this.handleFormInput}
            onSubmit={this.handleEdit}
            formInput={this.state}
          />
        )}
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
  addUser: userInfo => dispatch(addUser(userInfo)),
  editUser: userInfo => dispatch(editUser(userInfo))
})

export default connect(mapState, mapDispatch)(Users)
