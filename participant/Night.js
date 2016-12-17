import React, { Component } from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'

import Ability from './Ability'
import Result from './Result'

const mapStateToProps = ({ isAlive, date, resultOfDay }) => ({
  isAlive,
  date,
  resultOfDay
})

class Night extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    const { isAlive, date, resultOfDay } = this.props
    return (
      <Card>
        <CardTitle title="人狼" subtitle={(date + 1) + "日目 : 夜"}/>
          <CardText>
            <p>恐ろしい夜になりました。<br /></p>
            <p>先程の投票の結果、<b>{resultOfDay[date]["evening"].dead_people}</b>さんが吊られました。</p>
            <p>能力を持っている役職の人は、能力を使用することができます。</p><br />
            {((isAlive) ? <div><Divider /><Ability /></div> : <Result />)}<br />
          </CardText>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(Night)

