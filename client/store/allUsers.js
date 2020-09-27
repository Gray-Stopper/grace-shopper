import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'
const ADD_USER = 'ADD_USER'
const EDIT_USER = 'EDIT_USER'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})

const removedUser = userId => ({type: DELETE_USER, userId})

const addedUser = user => ({type: ADD_USER, user})

const editedUser = (id, user) => ({type: EDIT_USER, id, user})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users/')
    dispatch(getUsers(data))
  } catch (err) {
    console.error(err)
  }
}

export const addUser = userInfo => async dispatch => {
  try {
    const {data, status} = await axios.post('/api/users/', userInfo)
    if (status === 200) {
      dispatch(addedUser(data))
    } else if (status === 401) {
      throw new Error('Unauthorized attempt to add user')
    } else {
      throw new Error('add user failed')
    }
  } catch (err) {
    console.error(err)
  }
}

export const editUser = userInfo => async dispatch => {
  try {
    const {data, status} = await axios.put(
      '/api/users/' + userInfo.id,
      userInfo
    )
    if (status === 200) {
      dispatch(editedUser(userInfo.id, data))
    } else if (status === 401) {
      throw new Error('Unauthorized attempt to edit user')
    } else {
      throw new Error('edit user failed')
    }
  } catch (err) {
    console.error(err)
  }
}

export const removeUser = userId => async dispatch => {
  try {
    const {status} = await axios.delete(`/api/users/${userId}`)
    if (status === 204) {
      dispatch(removedUser(userId))
    } else if (status === 401) {
      throw new Error('Unauthorized attempt to delete user')
    } else {
      throw new Error('delete user failed')
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case ADD_USER:
      return [...state, action.user]
    case EDIT_USER:
      return state.map(user => {
        if (user.id === action.id) {
          return action.user[0]
        } else {
          return user
        }
      })
    case DELETE_USER:
      return state.filter(user => user.id !== action.userId)
    default:
      return state
  }
}
