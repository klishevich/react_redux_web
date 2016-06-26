import React, { PropTypes, Component } from 'react';
import { addList, editNewList } from '../actions'
import { connect } from 'react-redux'

class AddList extends Component {
  // static propTypes = {
  //   addList: PropTypes.func.isRequired
  // };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)

    // this.state = {
    //   name: this.props.name || ''
    // };
  }

  handleSave(text) {
    // if (text.length !== 0) {
    //   this.props.addList(text);
    //   // dispatch(addTodo(input.value))
    // }
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(AddList(text))
  }

  handleChange(e) {
    // this.setState({ name: e.target.value });
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