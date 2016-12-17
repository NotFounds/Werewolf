import React, { Component } from 'react'
import { connect } from 'react-redux'

import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import { ability, check } from '../actions'

const actionCreators = {
  ability,
  check,
}

const mapStateToProps = ({ name, deadPeoples, option }) => ({
  name,
  deadPeoples,
  option
})

class Psychic extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {value: null}
  }

  handleChange(event, index, value) {
    this.setState({value: value})
  }

  handleClickAbility() {
    const { value } = this.state
    this.props.ability(value)
  }

  handleClickCheck() {
    this.props.check()
  }

  render() {
    const { name, deadPeoples, option } = this.props
    let list = []
    deadPeoples.forEach(function(value, index, array) {
      if (value != name) {
        list.push(<MenuItem key={index} value={value} primaryText={value} />)
      }
    }.bind(this))
    return (
        <div>
          <p>処刑されたプレイヤーが人狼側だったか調べることができます。</p>
          {(option != null && 'target' in option
            ? <div>
                <p>霊能力を使用した結果、{option.target}さんは{option.isWerewolf ? "人狼でした。" : "人狼ではありませんでした。"}</p>
                <FlatButton
                  primary={true}
                  onClick={this.handleClickCheck.bind(this)}
                >確認</FlatButton>
            </div>
            : <div>
                <SelectField
                  value={this.state.value}
                  onChange={this.handleChange.bind(this)}
                  hintText="選択して下さい"
                  hintStyle = {{backgroundColor: '#303030', zIndex: 1, pointerEvents: 'none',  width: '85%'}}
                >{list}</SelectField>
                <RaisedButton
                  primary={true}
                  onClick={this.handleClickAbility.bind(this)}
                >調べる</RaisedButton>
            </div>)}
        </div>
    )}
}

export default connect(mapStateToProps, actionCreators)(Psychic)
