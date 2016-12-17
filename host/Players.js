import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

const mapStateToProps = ({ roles, participants }) => ({
  roles,
  participants,
})

const Player = ({ name, role, isAlive, page }) => (
  <tr>
    <td>{name}</td>
    <td>{role}</td>
    <td>{page}</td>
    <td>{
      isAlive
        ? "生存"
        : "死亡"
    }</td>
  </tr>
)

class Players extends Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    let { roles, participants } = this.props
    if (participants == undefined) {
      participants = []
    }
    return (
      <Card>
        <CardHeader
          title={"Players : " + Object.keys(participants).length + "人"}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <table>
            <thead>
              <tr>
                <th>名前</th>
                <th>役</th>
                <th>ページ</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(participants).map(id => (
                  <Player
                    key={id}
                    name={(participants[id].name != "")
                      ? participants[id].name
                      : "id: "+id}
                      role={participants[id].role != null
                        ? roles[participants[id].role].name
                        : "未定"}
                        page={participants[id].page}
                        isAlive={participants[id].isAlive}
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

export default connect(mapStateToProps)(Players)
