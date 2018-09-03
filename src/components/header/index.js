import React from 'react'
import { connect } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import AppData from '../../data'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.onDashboardClick = this._onDashboardClick.bind(this)

    // this.state = {
    //   currentProject: null,
    //   currentSprint: null,
    //   currentTask: null,
    // }
  }

  _onDashboardClick() {
    // this.props.history.push('/')
  }


  render() {
    const getBreadCrumbTask = () => {
      if (this.props.currentTask) {
        return (
          <Breadcrumb.Item active>{this.props.currentTask.id}</Breadcrumb.Item>
        )
      } else {
        return null;
      }
    }

    const getBreadCrumbSprint = () => {
      if (this.props.currentSprint) {
        return (
          <Breadcrumb.Item active={this.props.currentTask == null}>
            {this.props.currentSprint.id}
          </Breadcrumb.Item>
        )
      } else {
        return null;
      }
    }

    const getBreadCrumbProject = () => {
      if (this.props.currentProject) {
        return (
          <Breadcrumb.Item
            onClick={() => AppData.goToProject(this.props.currentProject.id)}
            active={this.props.currentSprint == null}>
            {this.props.currentProject.id}
          </Breadcrumb.Item>
        )
      } else {
        return null;
      }
    }

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => AppData.goToUser(this.props.currentUser.id)}>Dashboard</Breadcrumb.Item>
          {getBreadCrumbProject()}
          {getBreadCrumbSprint()}
          {getBreadCrumbTask()}
        </Breadcrumb>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentProject: state.currentProject,
    currentSprint: state.currentSprint,
  }
}

export default connect(mapStateToProps)(Header)
