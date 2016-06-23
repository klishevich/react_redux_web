import { combineReducers } from 'redux'
import { ADD_LIST } from './actions'

function lists(state = [], action) {
  switch (action.type) {
    case ADD_LIST:
      var t =  [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
      console.log('reducers.js, function todos, case ADD_TODO', t)
      return t
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (todo.id === action.id) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}