import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'

import { getResult } from './actions'

const mapStateToProps = ({ resultOfDay, roles, date }) => ({
  resultOfDay,
  roles,
  date
})

const Player = ({ name, role, isAlive }) => (
  <tr>
    <td>{name}</td>
    <td>{role}</td>
    <td>{
      isAlive
        ? "生存"
        : "死亡"
    }</td>
  </tr>
)

class Result extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    const { resultOfDay, roles, date } = this.props
    return (
      <Card>
        <CardTitle title="人狼" subtitle="結果"/>
          <CardText>
            {(resultOfDay[date+1].isEnd
              ? <div>
                  <p>ゲームは終了しました。お疲れ様でした。</p>
                  <p>{resultOfDay[date+1].side}陣営の方の勝利です。</p>
                </div>
              : <p>あなたは死亡しました。ゲームが終了するまで、話し合い等に参加することはできません。</p>
            )}
            <p>今回の役職は以下のとおりです。</p>
            <table>
              <thead>
                <tr>
                  <th>名前</th>
                  <th>役</th>
                  <th>状態</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(resultOfDay[date+1].players).map(id => (
                    <Player
                      key={id}
                      name={(resultOfDay[date+1].players[id].name != "")
                              ? resultOfDay[date+1].players[id].name
                              : "id: "+id}
                      role={resultOfDay[date+1].players[id].role != null
                              ? roles[resultOfDay[date+1].players[id].role].name
                              : "未定"}
                      isAlive={resultOfDay[date+1].players[id].is_alive}
                    />
                  ))
                }
              </tbody>
            </table>
          </CardText>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(Result)
