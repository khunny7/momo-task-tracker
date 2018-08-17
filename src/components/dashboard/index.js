import React from 'react'
import { ProjectPreview } from '../project/preview'
import { MockDataRepository } from '../../repository/mock-data-repository'
import './index.less'

export class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      projects: []
    }

    this.onProjectSelected = this.onProjectSelected.bind(this)
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
    const dataRepository = new MockDataRepository()

    dataRepository.getUserAsync(userId).then((user) => {
      this.setState({
        userName: user.name,
        projects: user.projects,
      })
    })
  }

  onProjectSelected(evt) {
    const projectId = evt.currentTarget.id

    this.props.history.push(`/project/${projectId}`)
  }

  render() {
    const showProjectList = () => {
      return (this.state.projects.map((project) => {
        return (
          <div
            key={project.id}
            id={project.id}
            data-name={project.name}
            onClick={this.onProjectSelected}
            className='project-preview-container'>
            <ProjectPreview
              startDate={project.startDate}
              endDate={project.endDate}
              sprintIds={project.sprintIds}
              name={project.name}
              description={project.description}
              goal={project.goal}
              progress={project.progress}
            />
          </div>
        )
      }))
    }

    return (
      <div>
        <div>
          {this.state.userName}
        </div>
        <div>
          {showProjectList()}
        </div>
      </div>
    )
  }
}