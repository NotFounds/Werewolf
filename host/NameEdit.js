import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { setName } from './actions'

const mapStateToProps = ({ data }) => ({
  data
})

class NameEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange(event) {
    const value = event.target.value
    this.setState({
      value: value
    })
  }

  handleClick() {
    const { dispatch } = this.props
    const { value } = this.state
    dispatch(setName(value))
  }

  render() {
    const { value } = this.state
    return(
      <div>
      <p>ゲームで使用する村の名前を入力してください。</p>
      <TextField
        floatingLabelText='村の名前'
        value={value}
        onChange={this.handleChange.bind(this)}
      /><br /><br />
      <RaisedButton
      primary={true}
      onClick={this.handleClick.bind(this)}
      >決定</RaisedButton><br /><br />
      </div>
    )
  }
}

export default connect(mapStateToProps)(NameEdit)
