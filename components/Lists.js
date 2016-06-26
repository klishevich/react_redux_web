import React, { PropTypes, Component } from 'react'

export default class Lists extends Component {
  render() {
    return (
      <ul>
        {this.props.lists.map((list, i) =>
          <li key={i}>{list.name} (order: {list.order})</li>
        )}
      </ul>
    )
  }
}

Lists.propTypes = {
  lists: PropTypes.array.isRequired
}