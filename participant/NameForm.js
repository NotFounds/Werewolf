import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

import { setName } from './actions'

const mapStateToProps = ({}) => ({
})

class NameForm extends Component {
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
    return (
      <div>
        <Card>
          <CardTitle title="人狼" subtitle="ニックネームの登録"/>
          <CardText>
            <p>ゲーム中に使用するニックネームを入力してください。</p>
            <TextField
              floatingLabelText='ニックネーム'
              value={value}
              onChange={this.handleChange.bind(this)}
            /><br />
          </CardText>
          <CardActions>
            <FlatButton
              primary={true}
              onClick={this.handleClick.bind(this)}
            >決定</FlatButton>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps)(NameForm)
