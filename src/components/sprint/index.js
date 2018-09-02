import React from 'react'
import _ from 'underscore'
import { Col, Button } from 'react-bootstrap'
import BlockUi from 'react-block-ui'
import { getSprintAsync } from '../../repository/firebase-data-repository'
import { TaskPreview } from '../task/preview'
import { CrudTask } from '../task/crud-task'
import CircularProgressbar from 'react-circular-progressbar'
import {
  getDurationInHours,
  getDurationInString,
} from '../../utils/time-utils'
import './index.less'

export class Sprint extends React.Component {
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

  componentWillMount() {
    this._loadSprintAsync(this.props.match.params.sid)
  }

  componentWillReceiveProps(newProps) {
    this._loadSprintAsync(newProps.match.params.sid)
  }

  _loadSprintAsync(sprintId) {
    this.setState({
      isDataLoaded: false,
    })

    return getSprintAsync(sprintId).then((sprint) => {
      let newState = {
        isDataLoaded: true,
      }

      newState = _.extendOwn(newState, sprint)

      this.setState(newState)
    });
  }

  _onTaskSaved(task) {
    this.setState({
      isCrudTaskOpen: false,
    })

    this._loadSprintAsync(this.props.match.params.sid)
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
    if (this.state.isDataLoaded) {
      return (
        <div>
          <div className='sprint-view-header'>
            <div className='name-container'>
              Sprint: {this.state.name}
            </div>
            <div className='description-container'>
              <span>description</span>
              <span>{this.state.description}</span>
            </div>
            <div>
              <span>{(new Date(this.state.start)).toLocaleDateString()}</span>
              <span> - </span>
              <span>{(new Date(this.state.end)).toLocaleDateString()}</span>
            </div>
          </div>
          <div className='sprint-view-body'>
            <Button onClick={this.onStartNewTask}>Start a new task</Button>
            <Button onClick={this.onAddRecord}>Add a record</Button>
            <CrudTask
              isOpen={this.state.isCrudTaskOpen}
              sid={this.state.id}
              pid={this.props.match.params.pid}
              onTaskSaved={this.onTaskSaved}
              onSetTaskOpen={this.onSetIsCrudTaskOpen}
            />
            <Col xs={8} sm={6} md={4}>
              <div className='circular-progress-container'>
                <CircularProgressbar
                  percentage={getDurationInHours(this.state.progress) / this.state.goal * 100}
                  text={getDurationInString(this.state.progress)}
                  initialAnimation={true}
                  strokeWidth={5}
                />
              </div>
            </Col>
            <Col xs={12} sm={6} md={8}>

              <div className='tasks-container'>
                {
                  _.map(this.state.taskPreviews, (task) =>
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
        <BlockUi blocking={!this.state.isDataLoaded}>
          {this._getContent()}
        </BlockUi>
      </div>
    )
  }
}