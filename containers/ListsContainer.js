import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchListsIfNeeded, invalidateLists } from '../actions'
import Lists from '../components/Lists'

class ListsContainer extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchListsIfNeeded())
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(invalidateLists())
    dispatch(fetchListsIfNeeded())
  }

  render() {
    const { lists, isFetching, lastUpdated } = this.props
    console.log('ListsContainer.js this.props', this.props);
    // console.log('ListsContainer.js this.state', this.state);
    // console.log('ListsContainer.js lists', lists);
    return (
      <div>
        <h1>Lists</h1>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && lists.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && lists.length === 0 &&
          <h2>No Lists in Data Base.</h2>
        }
        {lists.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Lists lists={lists} />
          </div>
        }
      </div>
    )
  }
}

ListsContainer.propTypes = {
  lists: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  // console.log('mapStateToProps');
  const { allLists } = state
  const {
    isFetching,
    lastUpdated,
    items: lists
  } = allLists.lists || {
    isFetching: true,
    items: []
  }

  return {
    lists,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(ListsContainer)