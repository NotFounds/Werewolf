import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { start } from './actions'

const actionCreators = {
  start
}

class StartButton extends Component {
  constructor(props) {
    super(props)
  }

  handleClick() {
    this.props.start()
  }

  render() {
    return (
      <RaisedButton
        primary={true}
        onClick={this.handleClick.bind(this)}
      >ゲーム開始</RaisedButton>
    )
  }
}

export default connect(null, actionCreators)(StartButton)
