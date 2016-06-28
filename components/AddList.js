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
    console.log('e.target.name',e.target.name);
    e.preventDefault()
    var obj = {}
    obj['name'] = this.props.newListItem.name
    obj['order'] = this.props.newListItem.order
    obj[e.target.name] = e.target.value

    const { dispatch } = this.props
    console.log('e.target.action',editNewList(obj));
    dispatch(editNewList(obj))
  }

  render() {
    const { newListItem, isAdding } = this.props
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
              value={newListItem.name}
              placeholder='Enter List Name' 
              onChange={this.handleChange}/>
            <input 
              type='text' 
              name='order' 
              id='order'
              value={newListItem.order}
              placeholder='Enter Order' 
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
    newListItem
  } = newList 
  // || {
  //   isAdding: false,
  //   newListItem: { name: '', order: 0 }
  // }

  return {
    newListItem,
    isAdding
  }
}

AddList = connect(mapStateToProps)(AddList)
export default AddList