import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { match } from './actions'

const actionCreators = {
  match
}

class MatchingButton extends Component {
  constructor(props) {
    super(props)
  }

  handleClick() {
    this.props.match()
  }

  render() {
    return (
      <RaisedButton
        onClick={this.handleClick.bind(this)}
      >マッチング</RaisedButton>
    )
  }
}

export default connect(null, actionCreators)(MatchingButton)
