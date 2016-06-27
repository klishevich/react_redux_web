import fetch from 'isomorphic-fetch'

export const EDIT_NEW_LIST = 'EDIT_NEW_LIST'
export const ADD_NEW_LIST_CLICK = 'ADD_NEW_LIST_CLICK'
export const ADD_NEW_LIST_POST = 'ADD_NEW_LIST_POST'
export const REQUEST_LISTS = 'REQUEST_LISTS'
export const RECEIVE_LISTS = 'RECEIVE_LISTS'
export const INVALIDATE_LISTS = 'INVALIDATE_LISTS'

export function editNewList(listName) {
  return { 
  	type: EDIT_NEW_LIST, 
  	listName 
  }
}

export function addNewListClick() {
  return { 
    type: ADD_NEW_LIST_CLICK
  }
}

export function addNewListPost() {
  return dispatch => {
    dispatch(newListPost())
    return fetch('http://localhost:3000/lists', {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(newListPostResult(json)))
  }
}

function newListPost() {
  return {
    type: NEW_LIST_POST
  }
}

function newListPostResult(json) {
  return {
    type: NEW_LIST_POST_RESULT,
    lists: json
  }
}

export function invalidateLists() {
  return {
    type: INVALIDATE_LISTS
  }
}

function requestLists() {
  // console.log('Actions REQUEST_LISTS');
  return {
    type: REQUEST_LISTS
  }
}

function receiveLists(json) {
  // console.log('Actions RECEIVE_LISTS', json);
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