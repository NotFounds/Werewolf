import React, { Component } from 'react'
import { connect } from 'react-redux'

import MenuItem from 'material-ui/MenuItem'
import {List, ListItem} from 'material-ui/List'

const mapStateToProps = ({ werewolfs }) => ({
  werewolfs
})

const WerewolfItem = ({ value }) => (
  <ListItem primaryText={value} />
)

class WerewolfUtil extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { werewolfs } = this.props
    let list = []
    if (werewolfs != null) {
      werewolfs.forEach(function(value, index, array) {
        list.push(<WerewolfItem key={index} value={value} />)
      }.bind(this))
    }
    return (
        <div>
          <p>以下に人狼のリストを示します。</p>
          {<List>{list}</List>}
        </div>
    )
  }
}

export default connect(mapStateToProps)(WerewolfUtil)
