import React from 'react'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Alert,
} from 'react-bootstrap'
import PropTypes from 'prop-types';
import { Modal } from '../modal'
import { RangeDatePicker } from '../range-date-picker'
import { createProjectAsync } from '../../repository/firebase-data-repository'

export class CrudProject extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      projectName: '',
      projectDescription: '',
      errors: [],
      projectStart: null,
      projectEnd: null,
    }

    this.onProjectNameChange = this._onProjectNameChange.bind(this)
    this.onProjectDescriptionChange = this._onProjectDescriptionChange.bind(this)
    this.onSave = this._onSave.bind(this)
    this.onCancel = this._onCancel.bind(this)
    this.onDateRangeSet = this._onDateRangeSet.bind(this)
  }

  _onProjectNameChange(e) {
    this.setState({
      projectName: e.target.value
    })
  }

  _onProjectDescriptionChange(e) {
    this.setState({
      projectDescription: e.target.value
    })
  }

  _onSave() {
    const errors = this._validate();

    if (errors.length > 0) {
      this.setState({
        errors,
      })
    } else {
      createProjectAsync({
        name: this.state.projectName,
        description: this.state.projectDescription,
        start: this.state.projectStart.valueOf(),
        end: this.state.projectEnd.valueOf(),
        sprintPreviews: [],
      }, this.props.uid).then(() => {
        this.props.onSave()
      })
    }
  }

  _onCancel() {
    this.props.onCancel()

    //clear
  }

  _onDateRangeSet({ from, to }) {
    this.setState({
      projectStart: from,
      projectEnd: to,
    })
  }

  _validate() {
    const errors = [];
    if (this.state.projectName.length < 5) {
      errors.push('Project name should be at least 5 characters')
    }

    if (!(this.state.projectEnd && this.state.projectStart)) {
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
          <FormGroup
            controlId='projectNameInput'>
            <ControlLabel>Input project name you want to use</ControlLabel>
            <FormControl
              type='text'
              value={this.state.projectName}
              placeholder='unnamed project'
              onChange={this.onProjectNameChange}
            />
            <HelpBlock>Project name is mandatory</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId='projectDescriptionInput'>
            <ControlLabel>Input description for the project</ControlLabel>
            <FormControl
              type='text'
              value={this.state.projectDescription}
              placeholder=''
              onChange={this.onProjectDescriptionChange}
            />
            <HelpBlock>Project description is optional</HelpBlock>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Set the start date and the end date of the project</ControlLabel>
            <RangeDatePicker
              onDateRangeSet={this.onDateRangeSet}
            />
          </FormGroup>

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

CrudProject.propTypes = {
  uid: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
}