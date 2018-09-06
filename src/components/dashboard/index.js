import React from 'react'
import _ from 'underscore'
import { Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import 'react-block-ui/style.css'
import { ProjectPreview } from '../project/preview'
import { CrudProject } from '../project/crud-project'
import { getUserAsync, saveUserAsync } from '../../repository/firebase-user-repository'
import AppData from '../../data/index'
import './index.less'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCrudProjectOpen: false,
    }

    this.onProjectSelected = this.onProjectSelected.bind(this)
    this.onCreateProject = this._onCreateProject.bind(this)
    this.onProjectCrudCanceled = this._onProjectCrudCanceled.bind(this)
    this.onProjectSaved = this._onProjectSaved.bind(this)
  }

  onProjectSelected(evt) {
    const projectId = evt.currentTarget.id

    AppData.goToProject(projectId)
  }

  _onCreateProject() {
    this.setState({
      isCrudProjectOpen: true,
    })
  }

  _onProjectSaved() {
    this.setState({
      isCrudProjectOpen: false,
    })

    AppData.refreshCurrentAppUser()
  }

  _onProjectCrudCanceled() {
    this.setState({
      isCrudProjectOpen: false,
    })
  }

  _getUserId() {
    return this.props.currentUser ? this.props.currentUser.uid : ''
  }

  render() {
    const showProjectList = () => {
      if (!this.props.currentUser.projectPreviews) {
        return <div>It is lonely here.</div>
      }

      return (_.map(this.props.currentUser.projectPreviews, (projectInList) => {
        return (
          <Col
            sm={4}
            key={projectInList.id}>
            <div

              id={projectInList.id}
              data-name={projectInList.name}
              onClick={this.onProjectSelected}
              className='project-preview-container'>
              <ProjectPreview
                projectPreviewItem={projectInList}
              />
            </div>
          </Col>
        )
      }))
    }

    if (this.props.currentUser) {
      return (
        <div>
          <Row className="dashboard-header-container">
            <Col sm={6}>
              <div className="name-container">
                Hello, {this.props.currentUser.displayName}!
              </div>
              <Button onClick={this.onCreateProject}>
                Create Project
              </Button>
            </Col>
            <Col sm={6}>
              <div className="extra-info">
                <div>
                  2 current projects
              </div>
                <div>
                  3 completed projects with goals
              </div>
                <div>
                  2 projects did not meet the goal.
              </div>
              </div>
            </Col>
          </Row>
          <CrudProject
            uid={this._getUserId()}
            isOpen={this.state.isCrudProjectOpen}
            onSave={this.onProjectSaved}
            onCancel={this.onProjectCrudCanceled}
          />
          <Row>
            {showProjectList()}
          </Row>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(Dashboard)
