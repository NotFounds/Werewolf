import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { skip } from './actions'

const actionCreators = {
  skip
}

const mapStateToProps = ({ mode }) => ({
  mode
})

class SkipMeetingButton extends Component {
  constructor(props) {
    super(props)
  }

  handleClick() {
    this.props.skip()
  }

  render() {
    const { mode } = this.props
    let disabled = (mode != "meeting")
    return (
      <RaisedButton
        disabled={disabled}
        secondary={true}
        onClick={this.handleClick.bind(this)}
      >話し合い終了</RaisedButton>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(SkipMeetingButton)
