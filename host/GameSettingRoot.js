import React, { Component } from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import NameEdit from './NameEdit'
import RoleSetting from './RoleSetting'
import MatchingButton from './MatchingButton'

const mapStateToProps = ({}) => ({
})

class GameSettingRoot extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    return(
      <Card>
        <CardHeader
          title={"Settings"}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <NameEdit />
          <Divider />
          <RoleSetting />
        </CardText>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(GameSettingRoot)
