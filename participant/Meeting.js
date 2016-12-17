import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

const mapStateToProps = ({}) => ({})

class Meeting extends Component {
  render() {
    return (
      <Card>
        <CardTitle title="人狼" subtitle="話し合い"/>
          <CardText>
            <p>村人たちは人狼を処刑するため話し合いを行い、その後投票で処刑する人を決めます。</p>
            <p>なお、死亡したプレイヤーは話し合いに参加することはできません。</p>
          </CardText>
          <div style={{textAlign: "center"}}>
            <CircularProgress size={2}/>
          </div>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(Meeting)
