import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import { setWait } from './actions'

const mapStateToProps = ({}) => ({})

class Description extends Component {
  handleClick() {
    this.props.dispatch(setWait())
  }

  render() {
    return (
      <Card>
        <CardTitle title="人狼" subtitle="説明"/>
          <CardText>
            <p>昔、あるところに小さな村がありました。<br /></p>
            <p>ある日、村で「人狼という怪物が出る」という噂が流れました。<br /></p>
            <p>人狼は、夜になると人間を捕まえて食べてしまいます。</p>
            <p>また、人狼は昼の間は人間の姿をしています。<br /></p>
            <p>そこで村人たちは話し合いを行います。しかし、村人の1人である吉田はこう言いました。<br /></p>
            <p>「そんなのデタラメだろ！俺は騙されないぞ！先に帰る。」<br /></p>
            <p>その一言により、結局なんの話し合いも行われないまま解散となり、夜を迎えました。<br /></p>
          </CardText>
          <CardActions>
            <FlatButton
              primary={true}
              onClick={this.handleClick.bind(this)}
            >確認</FlatButton>
          </CardActions>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(Description)
