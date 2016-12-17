import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { ability } from '../actions'

const mapStateToProps = ({ }) => ({
})

class Default extends Component {
  constructor(props, context) {
    super(props, context)
  }

  handleClick() {
    this.props.dispatch(ability(""))
  }

  render() {
    return (
        <div>
          <p>襲撃された人を確認したら、以下のボタンを押してください。</p><br />
          <RaisedButton
            primary={true}
            onClick={this.handleClick.bind(this)}
          >確認</RaisedButton>
        </div>
    )}
}

export default connect(mapStateToProps)(Default)
