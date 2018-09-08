import React from 'react'
import _ from 'underscore'
import { Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import 'react-block-ui/style.css'
import { ProjectPreview } from '../project/preview'
import { CrudProject } from '../project/crud-project'
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
    this.goToUser = this._goToUser.bind(this)
  }

  onProjectSelected(evt) {
    const projectId = evt.currentTarget.id

    AppData.goToProject(projectId)
  }

  _goToUser() {
    AppData.goToUser(this.props.currentUser.id)
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

  _dashboardHeaderComponent() {
    if (this.props.currentProject) {
      return (
        <Row className="dashboard-header-container minimized">
          <Col xs={12} md={6} lg={4}>
            <div className="name-container">
              Hello, {this.props.currentUser.displayName}!
          </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Button onClick={this.goToUser}>
              To dashboard
          </Button>
          </Col>
        </Row>
      )
    } else {
      return (
        <Row className="dashboard-header-container">
          <Col xs={12} md={6}>
            <div className="name-container">
              Hello, {this.props.currentUser.displayName}!
                </div>
            <Button onClick={this.onCreateProject}>
              Create Project
            </Button>
          </Col>
          <Col xs={12} md={6}>
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
      )
    }
  }

  _dashBoardProjectList = () => {
    if (!this.props.currentUser.projectPreviews) {
      return <div>It is lonely here.</div>
    }

    const isMinimized = !!(this.props.currentProject);
    const columnSizes = {
      xs: isMinimized ? 6 : 12,
      md: isMinimized ? 3 : 6,
      lg: isMinimized ? 2 : 4,
    }

    return (
      <div className="project-preview-list">
        {
          _.map(this.props.currentUser.projectPreviews, (projectInList) => {
            return (
              <Col
                xs={columnSizes.xs}
                md={columnSizes.md}
                lg={columnSizes.lg}
                key={projectInList.id}>
                <div
                  id={projectInList.id}
                  data-name={projectInList.name}
                  onClick={this.onProjectSelected}
                  className='project-preview-container'>
                  <ProjectPreview
                    isMinimized={isMinimized}
                    projectPreviewItem={projectInList}
                  />
                </div>
              </Col>
            )
          })
        }
      </div>
    )
  }

  render() {
    if (this.props.currentUser) {
      return (
        <div className="dashboard-content">
          {this._dashboardHeaderComponent()}
          <CrudProject
            uid={this._getUserId()}
            isOpen={this.state.isCrudProjectOpen}
            onSave={this.onProjectSaved}
            onCancel={this.onProjectCrudCanceled}
          />
          <Row>
            {this._dashBoardProjectList()}
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
    currentProject: state.currentProject,
  }
}

export default connect(mapStateToProps)(Dashboard)
