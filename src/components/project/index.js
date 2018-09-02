import React from 'react'
import _ from 'underscore'
import { ProgressBar, Button } from 'react-bootstrap'
import { SprintPreview } from '../sprint/preview'
import { CrudSprint } from '../sprint/crud-sprint'
import { getProjectAsync } from '../../repository/firebase-data-repository'
import {
  getDurationInHours,
  getDurationInString,
} from '../../utils/time-utils'
import './index.less'

// Props
// startDate
// endDate
// sprintIds
// name
// description
// goal: hours
// progress: hours
export class Project extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isDataLoaded: false,
      isCrudSprintOpen: false,
    }

    this.onClickSprint = this._onClickSprint.bind(this)
    this.onCreateSprint = this._onCreateSprint.bind(this)
    this.onSprintCrudCanceled = this._onSprintCrudCanceled.bind(this)
    this.onSprintSaved = this._onSprintSaved.bind(this)
  }

  _onClickSprint(evt) {
    const sprintId = evt.currentTarget.id
    const sprintName = evt.currentTarget.dataset.name

    this.props.history.push(`/project/${this.state.id}/sprint/${sprintId}`)
  }

  componentWillMount() {
    this._fetchProjectAndUpdate(this.props.match.params.id)
  }

  componentWillReceiveProps(newProps) {
    this._fetchProjectAndUpdate(newProps.match.params.id)
  }

  _fetchProjectAndUpdate(projectId) {
    return getProjectAsync(projectId).then((project) => {
      let newState = {
        isDataLoaded: true,
      }

      newState = _.extendOwn(newState, project)

      this.setState(newState)
    })
  }

  _onCreateSprint() {
    this.setState({
      isCrudSprintOpen: true,
    })
  }

  _onSprintSaved() {
    this.setState({
      isCrudSprintOpen: false,
    })

    this._fetchProjectAndUpdate(this.state.id)
  }

  _onSprintCrudCanceled() {
    this.setState({
      isCrudSprintOpen: false,
    })
  }

  render() {
    if (this.state.isDataLoaded) {
      return (
        <div className='project-view-container'>
          <div className='project-view-header'>
            <div className='name-container'>
              Project: {this.state.name}
            </div>
            <div className='description-container'>
              {this.state.description}
            </div>
            <div>
              <span>{(new Date(this.state.start)).toLocaleDateString()}</span>
              <span> - </span>
              <span>{(new Date(this.state.end)).toLocaleDateString()}</span>
            </div>
          </div>
          <div className='project-view-body'>
            <div>
              {getDurationInString(this.state.progress, 'progress')} / {this.state.goal} achieved
            </div>
            <ProgressBar now={getDurationInHours(this.state.progress) / this.state.goal * 100} />
            <Button onClick={this.onCreateSprint}>
              Create Sprint
            </Button>
            <CrudSprint
              pid={this.state.id}
              isOpen={this.state.isCrudSprintOpen}
              onSave={this.onSprintSaved}
              onCancel={this.onSprintCrudCanceled}
            />
            <div className='sprints-container'>
              {
                _.map(this.state.sprintPreviews, (sprintPreviewItem) => {
                  return (
                    <div
                      className='sprint-preview-container'
                      key={sprintPreviewItem.id}
                      id={sprintPreviewItem.id}
                      data-name={sprintPreviewItem.name}
                      onClick={this.onClickSprint}
                    >
                      <SprintPreview
                        sprintPreviewItem={sprintPreviewItem}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      )
    } else {
      return (<div>Fetching project</div>)
    }
  }
}
