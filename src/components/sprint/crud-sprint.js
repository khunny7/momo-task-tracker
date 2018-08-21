import React from 'react'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Alert,
  Grid,
  Row,
  Col,
} from 'react-bootstrap'
import PropTypes from 'prop-types';
import { Modal } from '../modal'
import { RangeDatePicker } from '../range-date-picker'
import { createSprintAsync } from '../../repository/firebase-data-repository'

export class CrudSprint extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sprintName: '',
      sprintDescription: '',
      errors: [],
      sprintStart: null,
      sprintEnd: null,
      sprintGoal: 5,
    }

    this.onSprintNameChange = this._onSprintNameChange.bind(this)
    this.onSprintDescriptionChange = this._onSprintDescriptionChange.bind(this)
    this.onSave = this._onSave.bind(this)
    this.onCancel = this._onCancel.bind(this)
    this.onDateRangeSet = this._onDateRangeSet.bind(this)
    this.onSprintGoalChange = this._onSprintGoalChange.bind(this)
  }

  _onSprintGoalChange(e) {
    this.setState({
      sprintGoal: e.target.value
    })
  }

  _onSprintNameChange(e) {
    this.setState({
      sprintName: e.target.value
    })
  }

  _onSprintDescriptionChange(e) {
    this.setState({
      sprintDescription: e.target.value
    })
  }

  _onSave() {
    const errors = this._validate();

    if (errors.length > 0) {
      this.setState({
        errors,
      })
    } else {
      createSprintAsync({
        name: this.state.sprintName,
        description: this.state.sprintDescription,
        start: this.state.sprintStart.valueOf(),
        end: this.state.sprintEnd.valueOf(),
        progress: 0,
        goal: this.state.sprintGoal,
        taskPreviewItems: [],
      }, this.props.pid).then((sprint) => {
        this.props.onSave(sprint)
      })
    }
  }

  _onCancel() {
    this.props.onCancel()

    //clear
  }

  _onDateRangeSet({ from, to }) {
    this.setState({
      sprintStart: from,
      sprintEnd: to,
    })
  }

  _validate() {
    const errors = [];
    if (this.state.sprintName.length < 5) {
      errors.push('sprint name should be at least 5 characters')
    }

    if (!(this.state.sprintEnd && this.state.sprintStart)) {
      errors.push("There must be a start date and a end date")
    }

    return errors;
  }

  _showErrors() {
    if (this.state.errors.length === 0) {
      return null;
    } else {
      return (
        <Alert bsStyle='warning'>
          {this.state.errors[0]}
        </Alert>
      )
    }
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.isOpen}>
          <ControlLabel>Sprint name</ControlLabel>
          <FormControl
            type='text'
            value={this.state.sprintName}
            placeholder='unnamed sprint'
            onChange={this.onSprintNameChange}
          />
          <HelpBlock>Sprint name is mandatory</HelpBlock>
          <ControlLabel>Input description for the sprint</ControlLabel>
          <FormControl
            type='text'
            value={this.state.sprintDescription}
            placeholder=''
            onChange={this.onSprintDescriptionChange}
          />
          <ControlLabel>Input goal hours for the sprint</ControlLabel>
          <FormControl
            type='text'
            value={this.state.sprintGoal}
            placeholder=''
            onChange={this.onSprintGoalChange}
          />
          <ControlLabel>Set the start date and the end date of the sprint</ControlLabel>
          <RangeDatePicker
            onDateRangeSet={this.onDateRangeSet}
          />

          {this._showErrors()}
          <Button onClick={this.onSave}>
            Save
          </Button>
          <Button onClick={this.onCancel}>
            Cancel
          </Button>
        </Modal>
      </div>
    )
  }
}

CrudSprint.propTypes = {
  pid: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
}