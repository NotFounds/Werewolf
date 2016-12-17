import React, { Component } from 'react'
import { connect } from 'react-redux'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

import { fetchContents } from 'shared/actions'

import Role from './Role'
import Wait from './Wait'
import Morning from './Morning'
import Meeting from './Meeting'
import Evening from './Evening'
import Night from './Night'
import Destroied from './Destroied'
import NameForm from './NameForm'
import Description from './Description'
import Result from './Result'

const actionCreators = {
  fetchContents
}

const mapStateToProps = ({page}) => ({
  page
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentWillMount() {
    this.props.fetchContents()
  }

  render() {
    const { page } = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme((page == "night") ? darkBaseTheme : lightBaseTheme)}>
        <div>
          { (page == "name") ? <NameForm /> : null }
          { (page == "description") ? <Description /> : null }
          { (page == "wait") ? <Wait /> : null }
          { (page == "role") ? <Role /> : null }
          { (page == "morning") ? <Morning /> : null }
          { (page == "meeting") ? <Meeting /> : null }
          { (page == "evening") ? <Evening /> : null }
          { (page == "night")   ? <Night /> : null }
          { (page == "destroied") ? <Destroied /> : null }
          { (page == "result") ? <Result /> : null }
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(App)
