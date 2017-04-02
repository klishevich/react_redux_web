import { combineReducers } from 'redux'
import {
  EDIT_NEW_LIST, 
  ADD_NEW_LIST_CLICK,
  REQUEST_LISTS,
  RECEIVE_LISTS,
  INVALIDATE_LISTS,
  NEW_LIST_POST_RESULT,
  EDIT_SIGN_UP_FORM,
  EDIT_SIGN_IN_FORM,
  SIGN_IN_POST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
} from '../actions'

function lists(state = { isFetching: false, didInvalidate: false, items: [] }, action) {
  switch (action.type) {
    case INVALIDATE_LISTS:
    return Object.assign({}, state, {
      didInvalidate: true
    })
    case REQUEST_LISTS:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    })
    case RECEIVE_LISTS:
    // console.log('RECEIVE_LISTS', action.lists);
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.lists,
      lastUpdated: action.receivedAt
    })
    default:
    return state
  }
}

function allLists(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_LISTS:
    case RECEIVE_LISTS:
    case REQUEST_LISTS:
      return Object.assign({}, state, {
        lists: lists(state.lists, action)
      })
    default:
      return state
  }
}

function newList(state = { isAdding: false, newListItem: { name: '', order: '1'}}, action) {
  switch (action.type) {
    case EDIT_NEW_LIST:
      return Object.assign({}, state, {
        newListItem: action.newListItem
      })
    case ADD_NEW_LIST_CLICK:
      return Object.assign({}, state, {
        isAdding: true
      })
    case NEW_LIST_POST_RESULT:
      return Object.assign({}, state, {
        isAdding: false,
        newListItem: { name: '', order: 1}
      })
    default:
      return state
  }
}

function signUpForm(state = { login: 'test601@test.com'}, action) {
  switch (action.type) {
    case EDIT_SIGN_UP_FORM:
      return Object.assign({}, state, action.signUpFormItem)
    default:
      return state
  }
}

function signInForm(state = { login: 'test601@test.com'}, action) {
  switch (action.type) {
    case EDIT_SIGN_IN_FORM:
      return Object.assign({}, state, action.signInFormItem)
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, { headers: action.headers })
    case SIGN_IN_ERROR:
      return Object.assign({}, state, { errors: action.errors })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  newList,
  allLists,
  signUpForm,
  signInForm
})

export default rootReducer
