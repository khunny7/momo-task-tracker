import React from 'react'
import { Breadcrumb } from 'react-bootstrap'

export class Header extends React.Component {
  constructor(props) {
    super(props)

    this.onDashboardClick = this._onDashboardClick.bind(this)

    this.state = {
      currentProject: null,
      currentSprint: null,
      currentTask: null,
    }
  }

  _onDashboardClick() {
    this.props.history.push('/')
  }

  componentDidMount() {
    this.setStateFromPath(this.props.location.pathname)
  }

  componentWillReceiveProps(newProps) {
    this.setStateFromPath(newProps.location.pathname)
  }

  setStateFromPath(pathString) {
    let currentProject = null;
    let currentSprint = null;
    let currentTask = null;

    let parsedPath = (new RegExp('project/([^//]+)/sprint/([^//]+)/task/([^//]+)')).exec(pathString)

    if (parsedPath != null) {
      currentTask = { id: parsedPath[3] }
      currentSprint = { id: parsedPath[2] }
      currentProject = { id: parsedPath[1] }
    }

    parsedPath = (new RegExp('project/([^//]+)/sprint/([^//]+)')).exec(pathString)

    if (parsedPath != null) {
      currentSprint = { id: parsedPath[2] }
      currentProject = { id: parsedPath[1] }
    }

    parsedPath = (new RegExp('project/([^//]+)')).exec(pathString)

    if (parsedPath != null) {
      currentProject = { id: parsedPath[1] }
    }


    this.setState({
      currentProject,
      currentSprint,
      currentTask
    })
  }

  render() {
    const getBreadCrumbTask = () => {
      if (this.state.currentTask) {
        return (
          <Breadcrumb.Item active>{this.state.currentTask.id}</Breadcrumb.Item>
        )
      } else {
        return (<div></div>)
      }
    }

    const getBreadCrumbSprint = () => {
      if (this.state.currentSprint) {
        return (
          <Breadcrumb.Item active={this.state.currentTask == null}>
            {this.state.currentSprint.id}
          </Breadcrumb.Item>
        )
      } else {
        return (<div></div>)
      }
    }

    const getBreadCrumbProject = () => {
      if (this.state.currentProject) {
        return (
          <Breadcrumb.Item active={this.state.currentSprint == null}>
            {this.state.currentProject.id}
          </Breadcrumb.Item>
        )
      } else {
        return (<div></div>)
      }
    }

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item onClick={this.onDashboardClick}>Dashboard</Breadcrumb.Item>
          {getBreadCrumbProject()}
          {getBreadCrumbSprint()}
          {getBreadCrumbTask()}
        </Breadcrumb>
      </div>
    )
  }
}