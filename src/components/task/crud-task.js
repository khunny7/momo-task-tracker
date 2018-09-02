import React from 'react'
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
import { createTaskAsync } from '../../repository/firebase-data-repository'
import './index.less'

export class CrudTask extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      taskName: '',
      isRunning: false,
      timerInMinutes: 20,
      isBlocking: false,
    }

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

    return createTaskAsync({
      name: this.state.taskName,
      runs: [
        {
          start: this.state.start,
          end: this.state.end,
        }
      ]
    }, this.props.sid, this.props.pid).then((savedTask) => {
      this.props.onTaskSaved(savedTask)
    })
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
                <Col xs={4} sm={2}>
                  <ButtonToolbar>
                    <ButtonGroup>
                      <Button
                        className='start-end-task-button'
                        onClick={this.onStartOrEnd}
                      >
                        <Glyphicon
                          glyph={this.state.isRunning ? 'stop' : 'play'}
                          style={{
                            fontSize: '48px',
                            color: '#666666'
                          }}
                        />
                        <div style={{
                          color: '#666666'
                        }}>
                          {this.state.isRunning ? 'End' : 'Start'}
                        </div>
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </Col>
                <Col xs={1} sm={4}></Col>
                <Col xs={7} sm={6}>
                  <ControlLabel className='timer-input-label'>Timer set (mins): </ControlLabel>
                  <FormControl
                    className='timer-input-form'
                    type='text'
                    value={this.state.timerInMinutes}
                    onChange={this.onTimerInMinuteChange}
                  />
                  <CircularProgressbar
                    percentage={(this.state.end - this.state.start) / 1000 / 60 / this.state.timerInMinutes * 100 % 100}
                    text={getDurationInString(this.state.end - this.state.start)}
                    initialAnimation={true}
                    strokeWidth={5}
                  />
                </Col>
              </Row>
              <div>
                <Button
                  onClick={this.onClose}>
                  Close
               </Button>
              </div>
            </div>
          </BlockUi>
        </Modal>
      </div>
    )
  }
}