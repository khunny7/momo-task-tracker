import React from 'react'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
} from 'react-bootstrap'
import { Modal } from '../modal'
import { TimerView } from '../timer-view'

export class NewTaskCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      taskName: '',
    }

    this.onTaskNameChange = this._onTaskNameChange.bind(this)
    this.onStartTask = this._onStartTask.bind(this)
    this.onEndTask = this._onEndTask.bind(this)
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
      start: (new Date()).valueOf()
    })

    this.timerId = setInterval(() => {
      this.setState({
        end: (new Date()).valueOf()
      })
    }, 1000)
  }

  _onEndTask() {
    clearInterval(this.timerId)
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
          <Button
            onClick={this.onStartTask}>
            Start Task
          </Button>
          <Button
            onClick={this.onEndTask}>
            End Task
          </Button>
        </Modal>
      </div>
    )
  }
}