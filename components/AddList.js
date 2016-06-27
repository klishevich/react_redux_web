import React, { PropTypes, Component } from 'react';
import { addList, editNewList, addNewListClick, addNewListPost } from '../actions'
import { connect } from 'react-redux'

class AddList extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(addNewListClick())
    dispatch(addNewListPost())
  }

  handleChange(e) {
    console.log('e.target.value',e.target.value);
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(editNewList(e.target.value))
  }

  render() {
    const { name, isAdding } = this.props
    console.log('AddList.js this.props', this.props);
    return (
      <div className='addList'>
        <h1>Add List</h1>
        {isAdding &&
          <div>New Item is Adding...</div>
        }
        {!isAdding &&
          <div>
            <input 
              type='text' 
              name='name' 
              id='name'
              value={name}
              placeholder='Enter List Name' 
              onChange={this.handleChange}/>
            <a href="#" onClick={this.handleAdd}>Click to Add</a>
          </div>
        }
      </div>
    );
  }
}

AddList.propTypes = {
  // lists: PropTypes.array.isRequired,
  isAdding: PropTypes.bool.isRequired,
  // lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  // console.log('mapStateToProps');
  const { newList } = state
  const {
    isAdding,
    name: name
  } = newList || {
    isAdding: false,
    name: ''
  }

  return {
    name,
    isAdding
  }
}

AddList = connect(mapStateToProps)(AddList)
export default AddList