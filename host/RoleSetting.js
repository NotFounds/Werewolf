import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import { setRole } from './actions'

const actionCreators = {
  setRole
}

const mapStateToProps = ({ roles, roleNumber, participantsNumber }) => ({
  roles,
  roleNumber,
  participantsNumber,
})

class RoleSetting extends Component {
  constructor(props, context) {
    super(props, context)
    const { roleNumber } = this.props
    let cnt = 0
    Object.keys(roleNumber).forEach(function(role, index, array) {
      cnt += roleNumber[role]
    }.bind(this))
    this.state = {
      value: roleNumber,
      cnt: cnt
    }
  }

  handleClick() {
    const { participantsNumber } = this.props
    let { value, cnt} = this.state
    if (participantsNumber == cnt) {
      alert("現在の設定を保存しました。")
      this.props.setRole(value)
    }
    else alert(participantsNumber < cnt ? "参加人数が足りていません" : "役職が足りていません")
  }

  handleChange() {
    const { roles } = this.props
    let value = {}
    let cnt = 0
    Object.keys(roles).forEach(function(role, index, array) {
      value[role] = this.refs[role].state.value
      cnt += value[role]
    }.bind(this))
    this.setState({value: value, cnt: cnt})
  }

  render() {
    const { value, cnt } = this.state
    const { roles, roleNumber, participantsNumber } = this.props
    let list = Object.keys(roles).map(role => (
      <div key={role.toString()}>
      <p><b>{roles[role].name}</b><br />{value[role.toString()]} / {participantsNumber} 人</p>
      <Slider step={1} ref={role.toString()} value={value[role.toString()]} max={participantsNumber} onChange={this.handleChange.bind(this)} />
      </div>
    ))
    let color = (cnt != participantsNumber ? "red" : "green")
    return(
      <div>
      <p>設定されている役職の人数: <font color={color}>{cnt}/{participantsNumber}人</font></p>
      {list}
      <RaisedButton
      primary={true}
      onClick={this.handleClick.bind(this)}
      >決定</RaisedButton>
      </div>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(RoleSetting)
