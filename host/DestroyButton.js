import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { destroy } from './actions'

const actionCreators = {
  destroy
}

class DestroyButton extends Component {
  constructor(props) {
    super(props)
  }

  handleClick() {
    this.props.destroy()
  }

  render() {
    return (
      <RaisedButton
        secondary={true}
        onClick={this.handleClick.bind(this)}
      >廃村にする</RaisedButton>
    )
  }
}

export default connect(null, actionCreators)(DestroyButton)
