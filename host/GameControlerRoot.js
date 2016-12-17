import React, { Component } from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import StateView from './StateView'
import StartButton from './StartButton'
import DestroyButton from './DestroyButton'
import MatchingButton from './MatchingButton'
import SkipMeetingButton from './SkipMeetingButton'

const mapStateToProps = ({ data }) => ({
  data
})

class GameControlerRoot extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    return(
      <Card>
        <CardHeader title={"Controler"} />
        <CardText>
        <StateView />
        <MatchingButton />
        <StartButton />
        <DestroyButton /><br /><br />
        <Divider /><br />
        <SkipMeetingButton />
        </CardText>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(GameControlerRoot)
