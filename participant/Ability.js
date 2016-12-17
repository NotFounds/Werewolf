import React, { Component } from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'

import Seer from './Roles/Seer'
import Werewolf from './Roles/Werewolf'
import Psychic from './Roles/Psychic'
import Hunter from './Roles/Hunter'
import Default from './Roles/Default'

const mapStateToProps = ({ roles, role, name }) => ({
  roles,
  role,
  name
})

class Ability extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { roles, role, name } = this.props
    let list = []
    return (
        <div>
          <p>{name}さんの役職は<b>{role != null
                                            ? roles[role].name
                                            : ""}</b>です。</p>
          <p>{role != null
                ? roles[role].description
                : ""}</p>
          <Divider />
          {((role == "seer")     ? <Seer />     : null)}
          {((role == "psychic")  ? <Psychic />  : null)}
          {((role == "hunter")   ? <Hunter />   : null)}
          {((role == "werewolf") ? <Werewolf /> : null)}
          {((role == "villager") ? <Default />  : null)}
          {((role == "minion")   ? <Default />  : null)}
        </div>
    )
  }
}

export default connect(mapStateToProps)(Ability)
