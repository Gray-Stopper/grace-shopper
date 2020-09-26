import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'
const ADD_USER = 'ADD_USER'

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
    const {data} = await axios.post('/api/users/', userInfo)
    dispatch(addedUser(data))
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
    case DELETE_USER:
      return state.filter(user => user.id !== action.userId)
    default:
      return state
  }
}
