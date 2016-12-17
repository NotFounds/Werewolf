import React, { Component } from 'react'
import { connect } from 'react-redux'

import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton'

import { getOptionalData, ability } from '../actions'

const mapStateToProps = ({ player, alivePeoples, option }) => ({
  player,
  alivePeoples,
  option
})

class Hunter extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {value: null}
  }

  handleChange(event, index, value) {
    this.setState({value: value})
  }

  handleClick() {
    const { value } = this.state
    this.props.dispatch(ability(value))
  }

  render() {
    const { player, alivePeoples, option } = this.props
    alivePeoples.forEach(function(value, index, array) {
      if (value != player.name) {
        list.push(<MenuItem key={index} value={value} primaryText={value} />)
      }
    }.bind(this))
    return (
        <div>
          <p>生きているプレイヤーを一人襲撃から守ることができます。</p>
          <SelectField
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            hintText="選択して下さい"
            hintStyle = {{backgroundColor: '#303030', zIndex: 1, pointerEvents: 'none',  width: '85%'}}
          >{list}</SelectField>
          <RaisedButton
            primary={true}
            onClick={this.handleClick.bind(this)}
          >保護する</RaisedButton>
        </div>
    )}
}

export default connect(mapStateToProps)(Hunter)
