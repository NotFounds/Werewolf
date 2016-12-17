import React, { Component } from 'react'
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { fetchContents } from 'shared/actions'

import GameKey from './GameKey'
import Players from './Players'
import GameSettingRoot from './GameSettingRoot'
import GameControlerRoot from './GameControlerRoot'

const actionCreators = {
  fetchContents
}

const mapStateToProps = ({}) => ({
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      stepIndex: 0
    }
  }

  componentWillMount() {
    this.props.fetchContents()
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (<GameSettingRoot />)
      case 1:
        return (<GameControlerRoot />)
      default:
        return (<p></p>)
    }
  }

  handleNext() {
    const { stepIndex } = this.state
    if (stepIndex < 1) {
      this.setState({stepIndex: stepIndex + 1})
    }
  }

  handlePrev() {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1})
    }
  }

  render() {
    const { stepIndex } = this.state
    console.log(this.props)
    return(
      <MuiThemeProvider>
        <div>
          <GameKey />
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Waiting</StepLabel>
            </Step>
            <Step>
              <StepLabel>Game Settings</StepLabel>
            </Step>
            <Step>
              <StepLabel>Game Controler</StepLabel>
            </Step>
          </Stepper>
          <div>
            <Players />
            {this.getStepContent(stepIndex)}
          </div>
          <br />
          <div>
            <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onTouchTap={this.handlePrev.bind(this)}
                style={{marginRight: 12}}
              />
              <RaisedButton
                label="Next"
                disabled={stepIndex === 1}
                primary={true}
                onTouchTap={this.handleNext.bind(this)}
              />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(App)
