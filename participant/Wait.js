import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'

const mapStateToProps = ({}) => ({})

class Wait extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardTitle title="人狼" subtitle="待機中"/>
                    <CardText>
                        <p>他の参加者を待っています。</p>
                        <p>この画面のまましばらくお待ち下さい。</p>
                    </CardText>
                </Card>
            </div>
        )
    }
}
export default connect(mapStateToProps)(Wait)
