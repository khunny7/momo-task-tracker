import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import { ProgressBar, Button, Col, Row } from 'react-bootstrap'
import { SprintPreview } from '../sprint/preview'
import { CrudSprint } from '../sprint/crud-sprint'
import AppData from '../../data/index'
import CircularProgressbar from 'react-circular-progressbar'
import {
  getDurationInHours,
  getDurationInString,
} from '../../utils/time-utils'

// Props
// startDate
// endDate
// sprintIds
// name
// description
// goal: hours
// progress: hours
class Project extends React.Component {
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

    AppData.goToSprint(this.props.currentProject.id, sprintId)
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

    AppData.refreshCurrentProject();
  }

  _onSprintCrudCanceled() {
    this.setState({
      isCrudSprintOpen: false,
    })
  }

  render() {
    if (this.props.currentProject) {
      return (
        <div className='project-view-container'>
          <div className='project-view-header'>
            <div className='name-container'>
              Project: {this.props.currentProject.name}
            </div>
            <div className='description-container'>
              {this.props.currentProject.description}
            </div>
            <div className="date-container">
              <span>{(new Date(this.props.currentProject.start)).toLocaleDateString()}</span>
              <span> - </span>
              <span>{(new Date(this.props.currentProject.end)).toLocaleDateString()}</span>
            </div>
          </div>
          <div className='project-view-body row'>
            <Col xs={6} sm={4} md={3} lg={2}>
              <div>
                {getDurationInString(this.props.currentProject.progress, 'progress')} / {this.props.currentProject.goal} achieved
            </div>
              <CircularProgressbar
                percentage={getDurationInHours(this.props.currentProject.progress) / this.props.currentProject.goal * 100}
                text={getDurationInString(this.props.currentProject.progress)}
                initialAnimation={true}
                strokeWidth={5}
              />
            </Col>
            <Col xs={12} sm={8} md={9} lg={10}>
              <Button onClick={this.onCreateSprint}>
                Create New Sprint
            </Button>
              <Row>
                <div className='sprints-container'>
                  {
                    _.map(this.props.currentProject.sprintPreviews, (sprintPreviewItem) => {
                      return (
                        <Col
                          sm={6}
                          md={4}
                          lg={4}
                          className='sprint-preview-container'
                          key={sprintPreviewItem.id}
                          id={sprintPreviewItem.id}
                          data-name={sprintPreviewItem.name}
                          onClick={this.onClickSprint}
                        >
                          <SprintPreview
                            sprintPreviewItem={sprintPreviewItem}
                          />
                        </Col>
                      )
                    })
                  }
                </div>
              </Row>
            </Col>
            <CrudSprint
              pid={this.props.currentProject.id}
              isOpen={this.state.isCrudSprintOpen}
              onSave={this.onSprintSaved}
              onCancel={this.onSprintCrudCanceled}
            />
          </div>
        </div>
      )
    } else {
      return (<div>Fetching project</div>)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentProject: state.currentProject,
  }
}

export default connect(mapStateToProps)(Project)
