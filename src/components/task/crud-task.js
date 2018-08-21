import React from 'react'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Glyphicon,
  ButtonGroup,
  ButtonToolbar
} from 'react-bootstrap'
import { Modal } from '../modal'
import { TimerView } from '../timer-view'
import { MockDataRepository } from '../../repository/mock-data-repository'

export class CrudTask extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      taskName: '',
      isRunning: false,
    }

    this.onTaskNameChange = this._onTaskNameChange.bind(this)
    this.onClose = this._onClose.bind(this)
    this.onStartOrEnd = this._onStartOrEnd.bind(this)
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
    })

    const dataRepository = new MockDataRepository();

    dataRepository.saveTask({
      name: this.state.taskName,
      start: this.state.start,
      end: this.state.end,
      timeStamp: (new Date()).valueOf(),
    }).then((savedTask) => {
      this.props.onTaskSaved(savedTask)
    })
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.isOpen}
          onClose={this.toggleModal}>
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
          <TimerView
            start={this.state.start}
            end={this.state.end}
          />
          <ButtonToolbar>
            <ButtonGroup>
              <Button
                onClick={this.onStartOrEnd}
                style={{
                  background: 'none',
                  width:'100px',
                  border: '5px solid #CCCCCC',
                  borderRadius: '100px',
                  textAlign: 'center',
                }}
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
          <Button
            onClick={this.onClose}>
            Close
          </Button>
        </Modal>
      </div>
    )
  }
}