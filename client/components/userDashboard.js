import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers, removeUser, addUser, editUser} from '../store/allUsers'
import {UserRow, NewUser, EditUser} from './index'

class Users extends React.Component {
  constructor() {
    super()
    this.state = {
      mounted: false,
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
    this.setState({mounted: true})
  }

  showEdit(id) {
    const [userToEdit] = this.props.users.filter(aUser => aUser.id === id)
    this.setState(prevState => ({
      showEdit: !prevState.showEdit,
      editId: id,
      editFirstName: userToEdit.firstName,
      editLastName: userToEdit.lastName,
      editEmail: userToEdit.email,
      editIsAdmin: userToEdit.isAdmin
    }))
  }

  async handleRemove(userId) {
    await this.props.removeUser(userId)
  }

  async handleAdd(event) {
    event.preventDefault()
    const {
      newFirstName,
      newLastName,
      newEmail,
      newIsAdmin,
      newPassword
    } = this.state

    if (newFirstName && newLastName && newPassword && newEmail) {
      await this.props.addUser({
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        isAdmin: newIsAdmin,
        password: newPassword
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
    const {
      editFirstName,
      editLastName,
      editEmail,
      editId,
      editIsAdmin
    } = this.state

    if (editFirstName && editLastName && editEmail) {
      await this.props.editUser({
        id: editId,
        firstName: editFirstName,
        lastName: editLastName,
        email: editEmail,
        isAdmin: editIsAdmin
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
    if (!this.state.mounted) {
      return null
    } else {
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
          {this.state.showEdit && (
            <EditUser
              onChange={this.handleFormInput}
              onSubmit={this.handleEdit}
              formInput={this.state}
            />
          )}
          <NewUser
            onChange={this.handleFormInput}
            onSubmit={this.handleAdd}
            formInput={this.state}
          />
        </div>
      )
    }
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
