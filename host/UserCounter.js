import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ count }) => ({
  count
})

class UserCounter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { count } = this.props
    return (
      <h4>ユーザー数: <em>{ count }</em></h4>
    )
  }
}

export default connect(mapStateToProps)(UserCounter)
