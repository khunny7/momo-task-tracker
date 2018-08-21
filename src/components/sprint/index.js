import React from 'react'
import _ from 'underscore'
import { ProgressBar, Button } from 'react-bootstrap'
import { getSprintAsync } from '../../repository/firebase-data-repository'
import { TaskPreview } from '../task/preview'
import { CrudTask } from '../task/crud-task'
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

    // const dataRepository = new MockDataRepository()

    // const taskToSave = {
    //   id: task.id,
    //   name: task.name,
    //   timeStamp: task.timeStamp,
    //   durationOnTask: task.end - task.start,
    // }

    // return dataRepository.addTaskToSprint(taskToSave, this.state.id).then(() => {
    //   return this._loadSprintAsync(this.state.id).then(() => {
    //     // refreshed
    //   })
    // })
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

  render() {
    if (this.state.isDataLoaded) {
      return (
        <div className='sprint-view-container'>
          <div className='sprint-view-header'>
            <div className='name-container'>
              <span>name</span>
              <span>{this.state.name}</span>
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
            <div>
              {this.state.progress} / {this.state.goal} achieved
            </div>
            <ProgressBar now={this.state.progress / this.state.goal * 100} />
            <Button onClick={this.onStartNewTask}>Start a new task</Button>
            <Button onClick={this.onAddRecord}>Add a record</Button>
            <CrudTask
              isOpen={this.state.isCrudTaskOpen}
              onTaskSaved={this.onTaskSaved}
              onSetTaskOpen={this.onSetIsCrudTaskOpen}
            />

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
                        lastModified={task.lastModified}
                        durationOnTask={task.durationOnTask}
                      />
                    </div>
                  )
                )
              }
            </div>
          </div>
        </div>
      )
    } else {
      return (<div>Fetching sprint</div>)
    }
  }
}