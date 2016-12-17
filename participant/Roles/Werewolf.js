import React, { Component } from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import {List, ListItem} from 'material-ui/List'
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton'

import WerewolfUtil from './WerewolfUtil'
import { ability } from '../actions'

const actionCreators = {
  ability
}

const mapStateToProps = ({ name, alivePeoples }) => ({
  name,
  alivePeoples,
})

class Werewolf extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {value: null}
  }

  handleChange(event, index, value) {
    this.setState({value: value})
  }

  handleClick() {
    const { value } = this.state
    this.props.ability(value)
  }

  render() {
    const { name, alivePeoples } = this.props
    let list = []
    alivePeoples.forEach(function(value, index, array) {
      if (value != name) {
        list.push(<MenuItem key={index} value={value} primaryText={value} />)
      }
    }.bind(this))
    return (
        <div>
          <p>生きているプレイヤーを1人襲撃することができます。</p>
          <p>人狼が複数いて、異なる襲撃対象者を選択した場合は抽選によって、どちらか1人を襲撃します。</p>
          <WerewolfUtil />
          <SelectField
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            hintText="選択して下さい"
            hintStyle = {{backgroundColor: '#303030', zIndex: 1, pointerEvents: 'none',  width: '85%'}}
          >{list}</SelectField>
          <RaisedButton
            primary={true}
            onClick={this.handleClick.bind(this)}
          >襲撃する</RaisedButton>
        </div>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(Werewolf)
