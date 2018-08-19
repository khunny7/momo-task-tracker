import React from 'react'
import _ from 'underscore'
import { Button } from 'react-bootstrap'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import { ProjectPreview } from '../project/preview'
import { CrudProject } from '../project/crud-project'
import { getUserAsync, saveUserAsync } from '../../repository/firebase-user-repository'
import AppData from '../../data/index'
import './index.less'

export class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // projects: [],
      isCrudProjectOpen: false,
      // isUserDataLoaded: false,
    }

    this.onProjectSelected = this.onProjectSelected.bind(this)
    this.onCreateProject = this._onCreateProject.bind(this)
    this.onProjectCrudCanceled = this._onProjectCrudCanceled.bind(this)
    this.onProjectSaved = this._onProjectSaved.bind(this)
  }

  // componentDidMount() {
  //   if (this.props.currentUser) {
  //     this._fetchUserAndUpdate(this.props.currentUser.id)
  //   }
  // }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.currentUser) {
  //     this._fetchUserAndUpdate(newProps.currentUser.id)
  //   }
  // }

  // _fetchUserAndUpdate(userId) {
  //   this.setState({
  //     projects: [],
  //     isUserDataLoaded: false,
  //   })

  //   return getUserAsync(userId).then((user) => {
  //     this.setState({
  //       userDisplayName: user.displayName,
  //       projects: user.projects,
  //       isUserDataLoaded: true,
  //     })
  //   })
  // }

  onProjectSelected(evt) {
    const projectId = evt.currentTarget.id

    this.props.history.push(`/project/${projectId}`)
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
          <div
            key={projectInList.id}
            id={projectInList.id}
            data-name={projectInList.name}
            onClick={this.onProjectSelected}
            className='project-preview-container'>
            <ProjectPreview
              projectPreviewItem={projectInList}
            />
          </div>
        )
      }))
    }

    if (this.props.currentUser) {
      return (
        <div>
          <div>
            {this.props.currentUser.displayName}
          </div>
          <Button onClick={this.onCreateProject}>
            Create Project
            </Button>
          <CrudProject
            uid={this._getUserId()}
            isOpen={this.state.isCrudProjectOpen}
            onSave={this.onProjectSaved}
            onCancel={this.onProjectCrudCanceled}
          />
          <div>
            {showProjectList()}
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}