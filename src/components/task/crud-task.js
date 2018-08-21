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
import { MockDataRepository } from '../../repository/mock-data-repository'

export class CrudTask extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      taskName: '',
    }

    this.onTaskNameChange = this._onTaskNameChange.bind(this)
    this.onStartTask = this._onStartTask.bind(this)
    this.onEndTask = this._onEndTask.bind(this)
    this.onClose = this._onClose.bind(this)
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
          <Button
            onClick={this.onStartTask}>
            Start Task
          </Button>
          <Button
            onClick={this.onEndTask}>
            Save and End Task
          </Button>
          <Button
            onClick={this.onClose}>
            Close
          </Button>
        </Modal>
      </div>
    )
  }
}