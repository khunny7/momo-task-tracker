import React from 'react'
import { Button } from 'react-bootstrap'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import { ProjectPreview } from '../project/preview'
import { MockDataRepository } from '../../repository/mock-data-repository'
import { CrudProject } from '../project/crud-project'
import './index.less'

export class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      projects: [],
      isCrudProjectOpen: false,
      isUserDataLoaded: false,
    }

    this.onProjectSelected = this.onProjectSelected.bind(this)
    this.onCreateProject = this._onCreateProject.bind(this)
    this.onProjectCrudCanceled = this._onProjectCrudCanceled.bind(this)
    this.onProjectSaved = this._onProjectSaved.bind(this)
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this._fetchUserAndUpdate(this.props.currentUser.id)
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentUser) {
      this._fetchUserAndUpdate(newProps.currentUser.id)
    }
  }

  _fetchUserAndUpdate(userId) {
    this.setState({
      projects: [],
      isUserDataLoaded: false,
    })

    const dataRepository = new MockDataRepository()

    return dataRepository.getUserAsync(userId).then((user) => {
      this.setState({
        userName: user.name,
        projects: user.projects,
        isUserDataLoaded: true,
      })
    })
  }

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

    this._fetchUserAndUpdate(this._getUserId())
  }

  _onProjectCrudCanceled() {
    this.setState({
      isCrudProjectOpen: false,
    })
  }

  _getUserId() {
    return this.props.currentUser ? this.props.currentUser.id : ''
  }

  render() {
    const showProjectList = () => {
      return (this.state.projects.map((projectInList) => {
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

    return (
      <div>
        <BlockUi blocking={!this.state.isUserDataLoaded}>
          <div>
            {this.state.userName}
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
        </BlockUi>
      </div>
    )
  }
}