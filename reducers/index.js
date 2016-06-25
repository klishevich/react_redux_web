import { combineReducers } from 'redux'
import { 
  ADD_LIST,
  REQUEST_LISTS,
  RECEIVE_LISTS,
  INVALIDATE_LISTS
} from '../actions'

function lists(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
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

const rootReducer = combineReducers({
  allLists
})

export default rootReducer