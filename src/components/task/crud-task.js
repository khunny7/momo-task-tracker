import React from 'react'
import { connect } from 'react-redux'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Glyphicon,
  ButtonGroup,
  ButtonToolbar,
  Row,
  Col
} from 'react-bootstrap'
import BlockUi from 'react-block-ui'
import CircularProgressbar from 'react-circular-progressbar'
import { Modal } from '../modal'
import { TimerView } from '../timer-view'
import 'react-circular-progressbar/dist/styles.css'
import { getDurationInString } from '../../utils/time-utils'
import { saveTaskAsync } from '../../repository/firebase-data-repository'

class CrudTask extends React.Component {
  constructor(props) {
    super(props)

    const initialState = {
      taskName: '',
      isRunning: false,
      timerInMinutes: 20,
      isBlocking: false,
      runs: [],
    }

    if (this.props.taskOnEdit) {
      initialState.taskName = this.props.taskOnEdit.name
      initialState.runs = this.props.taskOnEdit.runs
    }

    this.state = initialState;

    this.onTaskNameChange = this._onTaskNameChange.bind(this)
    this.onClose = this._onClose.bind(this)
    this.onStartOrEnd = this._onStartOrEnd.bind(this)
    this.onTimerInMinuteChange = this._onTimerInMinuteChange.bind(this)
  }

  _onStartOrEnd = () => {
    if (!this.state.isRunning) {
      this._onStartTask()
    } else {
      this._onEndTask()
    }
  }

  _onClose = () => {
    this.props.onSetTaskOpen(false)
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  _onTaskNameChange(e) {
    this.setState({
      taskName: e.target.value
    })
  }

  _onStartTask() {
    this.setState({
      start: (new Date()).valueOf(),
      isRunning: true,
    })

    this.timerId = setInterval(() => {
      this.setState({
        end: (new Date()).valueOf()
      })
    }, 1000)
  }

  _onEndTask() {
    clearInterval(this.timerId)

    this.setState({
      isRunning: false,
      isBlocking: true,
    })

    return saveTaskAsync({
      name: this.state.taskName,
      runs: [
        {
          start: this.state.start,
          end: this.state.end,
        }
      ]
    }, this.props.sid, this.props.pid);

    // .then((savedTask) => {
    //   this.props.onTaskSaved(savedTask)
    // })
  }

  _onTimerInMinuteChange(e) {
    this.setState({
      timerInMinutes: Number.parseInt(e.target.value)
    })
  }

  render() {
    return (
      <div className='crud-task-container'>
        <Modal
          show={this.props.isOpen}
          onClose={this.toggleModal}>
          <BlockUi blocking={this.state.isBlocking}>
            <div className='clearfix crud-task-content'>
              <FormGroup
                controlId='taskNameInput'>
                <ControlLabel>Input task name you want to use</ControlLabel>
                <FormControl
                  type='text'
                  value={this.state.taskName}
                  placeholder='unnamed task'
                  onChange={this.onTaskNameChange}
                />
                <HelpBlock>Task name is optional</HelpBlock>
              </FormGroup>
              <Row>
                <Col xs={4} sm={5} md={6} lg={8}>
                  <ButtonToolbar>
                    <ButtonGroup>
                      <Button
                        className='start-end-task-button'
                        onClick={this.onStartOrEnd}
                      >
                        <Glyphicon
                          glyph={this.state.isRunning ? 'stop' : 'play'}
                        />
                        <div>
                          {this.state.isRunning ? 'End' : 'Start'}
                        </div>
                      </Button>
                    </ButtonGroup>
                    <Button
                      onClick={this.onClose}>
                      Close
                     </Button>
                  </ButtonToolbar>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}></Col>
                <Col xs={7} sm={6} md={5} lg={3}>
                  <ControlLabel className='timer-input-label'>Timer set (mins): </ControlLabel>
                  <FormControl
                    className='timer-input-form'
                    type='text'
                    value={this.state.timerInMinutes}
                    onChange={this.onTimerInMinuteChange}
                  />
                  <div className='progress-container'>
                    <CircularProgressbar
                      percentage={(this.state.end - this.state.start) / 1000 / 60 / this.state.timerInMinutes * 100 % 100}
                      text={getDurationInString(this.state.end - this.state.start)}
                      initialAnimation={true}
                      strokeWidth={5}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </BlockUi>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    taskOnEdit: state.taskOnEdit,
    pid: state.currentProject ? state.currentProject.id : null,
    sid: state.currentSprint ? state.currentSprint.id : null,
  }
}

export default connect(mapStateToProps)(CrudTask)
