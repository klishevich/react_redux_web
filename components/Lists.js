import React, { PropTypes, Component } from 'react'
let aStyle = {
  marginRight: 10
};
let thButtons = {
  width: 160
};

export default class Lists extends Component {
  render() {
    return (
      <table className="table table-striped">
        <tbody>
          <tr>
            <th style={thButtons}></th>
            <th>ID</th>
            <th>Name</th>
            <th>Order</th>
          </tr>
          {this.props.lists.map((list, i) =>
            <tr key={i}>
              <td>
                <div>
                  <a style={aStyle} href="#" className="btn btn-primary">Edit</a>
                  <a href="#" className="btn btn-danger">Delete</a>
                </div>
              </td>
              <td>{list.id}</td>
              <td>{list.name}</td>
              <td>{list.order}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

Lists.propTypes = {
  lists: PropTypes.array.isRequired
}