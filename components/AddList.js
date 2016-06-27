import React, { PropTypes, Component } from 'react';
import { addList, editNewList, addNewListClick, addNewListPost } from '../actions'
import { connect } from 'react-redux'

class AddList extends Component {
  // static propTypes = {
  //   addList: PropTypes.func.isRequired
  // };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd(e) {
    // if (text.length !== 0) {
    //   this.props.addList(text);
    //   // dispatch(addTodo(input.value))
    // }
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(addNewListClick())
  }

  handleChange(e) {
    console.log('e.target.value',e.target.value);
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(editNewList(e.target.value))
  }

  render() {
    console.log('AddList.js this.props', this.props);
    return (
      <div className='addList'>
        <h1>Add List</h1>
        <input 
          type='text' 
          name='name' 
          id='name' 
          placeholder='Enter List Name' 
          onChange={this.handleChange}/>
        <a href="#" onClick={this.handleAdd}>Click to Add</a>
      </div>
    );
  }
}

AddList.propTypes = {
  // lists: PropTypes.array.isRequired,
  // isFetching: PropTypes.bool.isRequired,
  // lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

AddList = connect()(AddList)
export default AddList