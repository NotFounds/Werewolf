import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardText, CardTitle } from 'material-ui/Card'

import WerewolfUtil from './Roles/WerewolfUtil'

const mapStateToProps = ({ roles, name, role }) => ({
  roles,
  name,
  role
})

class Role extends Component {
    render() {
        const { roles, name, role } = this.props
        return (
            <div>
                <Card>
                    <CardTitle title="人狼" subtitle="役職確認"/>
                    <CardText>
                        <p>参加者の登録が終了し、あなたの役職が決まりました。</p>
                        <p>{name}さんの役職は<b>{role != null
                                                ? roles[role].name
                                                : ""}</b>です。</p>
                        <p>{role != null
                              ? roles[role].description
                              : ""}</p>
                        {
                          (role == "werewolf")
                            ? <WerewolfUtil />
                            : null
                        }
                    </CardText>
                </Card>
            </div>
        )
    }
}
export default connect(mapStateToProps)(Role)
