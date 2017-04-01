import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import ListsContainer from './ListsContainer'
import AddListContainer from './AddListContainer'
import TestAxiosContainer from './TestAxiosContainer'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
      	<div className="container">
          <TestAxiosContainer />
    	 </div>
      </Provider>
    )
  }
}