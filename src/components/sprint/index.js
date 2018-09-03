import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import { Col, Button } from 'react-bootstrap'
import { TaskPreview } from '../task/preview'
import { CrudTask } from '../task/crud-task'
import AppData from '../../data/index'
import CircularProgressbar from 'react-circular-progressbar'
import {
  getDurationInHours,
  getDurationInString,
} from '../../utils/time-utils'
import './index.less'

class Sprint extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isDataLoaded: false,
      isCrudTaskOpen: false,
    }

    this.onStartNewTask = this._onStartNewTask.bind(this)
    this.onAddRecord = this._onAddRecord.bind(this)
    this.onSetIsCrudTaskOpen = this._onSetIsCrudTaskOpen.bind(this)
    this.onTaskSaved = this._onTaskSaved.bind(this)
  }

  _onTaskSaved(task) {
    this.setState({
      isCrudTaskOpen: false,
    })

    AppData.refreshCurrentSprint()
  }

  _onSetIsCrudTaskOpen(isOpen) {
    this.setState({
      isCrudTaskOpen: isOpen,
    })
  }

  _onStartNewTask() {
    this._onSetIsCrudTaskOpen(true)
  }

  _onAddRecord() {

  }

  _getContent() {
    if (this.props.currentSprint) {
      return (
        <div>
          <div className='sprint-view-header'>
            <div className='name-container'>
              Sprint: {this.props.currentSprint.name}
            </div>
            <div className='description-container'>
              <span>description</span>
              <span>{this.props.currentSprint.description}</span>
            </div>
            <div>
              <span>{(new Date(this.props.currentSprint.start)).toLocaleDateString()}</span>
              <span> - </span>
              <span>{(new Date(this.props.currentSprint.end)).toLocaleDateString()}</span>
            </div>
          </div>
          <div className='sprint-view-body'>
            <Button onClick={this.onStartNewTask}>Start a new task</Button>
            <Button onClick={this.onAddRecord}>Add a record</Button>
            <CrudTask
              isOpen={this.state.isCrudTaskOpen}
              sid={this.props.currentSprint.id}
              pid={this.props.pid}
              onTaskSaved={this.onTaskSaved}
              onSetTaskOpen={this.onSetIsCrudTaskOpen}
            />
            <Col xs={8} sm={6} md={4}>
              <div className='circular-progress-container'>
                <CircularProgressbar
                  percentage={getDurationInHours(this.props.currentSprint.progress) / this.props.currentSprint.goal * 100}
                  text={getDurationInString(this.props.currentSprint.progress)}
                  initialAnimation={true}
                  strokeWidth={5}
                />
              </div>
            </Col>
            <Col xs={12} sm={6} md={8}>

              <div className='tasks-container'>
                {
                  _.map(this.props.currentSprint.taskPreviews, (task) =>
                    (
                      <div
                        className='task-preview-container'
                        key={task.id}
                        id={task.id}
                        data-name={task.name}
                        onClick={this.onClickTask}
                      >
                        <TaskPreview
                          id={task.id}
                          name={task.name}
                          timeSpent={task.timeSpent}
                          timeStamp={task.timeStamp}
                        />
                      </div>
                    )
                  )
                }
              </div>
            </Col>
          </div>
        </div>
      )
    } else {
      return (<div>Fetching sprint</div>)
    }
  }

  render() {
    return (
      <div className='sprint-view-container'>
        {this._getContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentSprint: state.currentSprint,
    pid: state.currentProject ? state.currentProject.id : null,
  }
}

export default connect(mapStateToProps)(Sprint)
