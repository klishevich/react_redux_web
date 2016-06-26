import fetch from 'isomorphic-fetch'

export const EDIT_NEW_LIST = 'EDIT_NEW_LIST'
export const ADD_LIST = 'ADD_LIST'
export const REQUEST_LISTS = 'REQUEST_LISTS'
export const RECEIVE_LISTS = 'RECEIVE_LISTS'
export const INVALIDATE_LISTS = 'INVALIDATE_LISTS'

export function editNewList(listName) {
  return { 
  	type: EDIT_NEW_LIST, 
  	listName 
  }
}

export function addList(listName) {
  return { 
    type: ADD_LIST, 
    listName 
  }
}

export function invalidateLists() {
  return {
    type: INVALIDATE_LISTS
  }
}

function requestLists() {
  console.log('Actions REQUEST_LISTS');
  return {
    type: REQUEST_LISTS
  }
}

function receiveLists(json) {
  console.log('Actions RECEIVE_LISTS', json);
  return {
    type: RECEIVE_LISTS,
    lists: json,
    receivedAt: Date.now()
  }
}

function fetchLists() {
  return dispatch => {
    dispatch(requestLists())
    return fetch('http://localhost:3000/lists', {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveLists(json)))
  }
}

function shouldFetchLists(state) {
  const lists = state.allLists.lists
  if (!lists) {
    return true
  } else if (lists.isFetching) {
    return false
  } else {
    return lists.didInvalidate
  }
}

export function fetchListsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchLists(getState())) {
      return dispatch(fetchLists())
    }
  }
}