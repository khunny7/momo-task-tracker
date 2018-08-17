import React from 'react'
import _ from 'underscore'
import { ProgressBar } from 'react-bootstrap'
import { SprintPreview } from '../sprint/preview'
import { MockDataRepository } from '../../repository/mock-data-repository'
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
    }

    this.onClickSprint = this._onClickSprint.bind(this)
  }

  _onClickSprint(evt) {
    const sprintId = evt.currentTarget.id
    const sprintName = evt.currentTarget.dataset.name

    this.props.history.push(`/project/${this.state.id}/sprint/${sprintId}`)
  }

  componentWillMount() {
    const dataRepository = new MockDataRepository()

    dataRepository.getProjectByIdAsync(this.props.match.params.id).then((project) => {
      let newState = {
        isDataLoaded: true,
      }

      newState = _.extendOwn(newState, project)

      this.setState(newState)
    });
  }

  componentWillReceiveProps(newProps) {
    const dataRepository = new MockDataRepository(newProps)

    dataRepository.getProjectByIdAsync(newProps.match.params.id).then((project) => {
      let newState = {
        isDataLoaded: true,
      }

      newState = _.extendOwn(newState, project)

      this.setState(newState)
    });
  }

  render() {
    if (this.state.isDataLoaded) {
      return (
        <div className='project-view-container'>
          <div className='project-view-header'>
            <div className='name-container'>
              <span>name</span>
              <span>{this.state.name}</span>
            </div>
            <div className='description-container'>
              <span>description</span>
              <span>{this.state.description}</span>
            </div>
            <div>
              <span>{(new Date(this.state.startDate)).toLocaleDateString()}</span>
              <span> - </span>
              <span>{(new Date(this.state.endDate)).toLocaleDateString()}</span>
            </div>
          </div>
          <div className='project-view-body'>
            <div>
              {this.state.progress} / {this.state.goal} achieved
            </div>
            <ProgressBar now={this.state.progress / this.state.goal * 100} />
            <div className='sprints-container'>
              {
                this.state.sprints.map((sprint) =>
                  (
                    <div
                      className='sprint-preview-container'
                      key={sprint.id}
                      id={sprint.id}
                      data-name={sprint.name}
                      onClick={this.onClickSprint}
                    >
                      <SprintPreview
                        name={sprint.name}
                        description={sprint.description}
                        startDate={sprint.startDate}
                        endDate={sprint.endDate}
                        progress={sprint.progress}
                        goal={sprint.goal}
                      />
                    </div>
                  )
                )
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
