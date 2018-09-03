import _ from 'underscore'
import {
  setCurrentUser,
  setCurrentProject,
  setCurrentSprint,
  setCurrentTask,
} from '../store/actions'
import { getUserAsync } from '../repository/firebase-user-repository'
import { getProjectAsync, getSprintAsync } from '../repository/firebase-data-repository'

class AppData {
  constructor() {
    this.currentAuthUser = null;
    this.currentAppUser = null;
    this.currentProject = null;
    this.callbacks = {};
    this.nextCallBackId = 0;
  }

  refreshCurrentAppUser() {
    getUserAsync(this.currentAppUser.uid).then((savedUser) => {
      this.setCurrentAppUser(savedUser)
    })
  }

  getCurrentAppUser() {
    return this.currentAppUser
  }

  setCurrentAppUser(appUser) {
    this.currentAppUser = appUser;

    store.dispatch(setCurrentUser(
      appUser
    ))

    _.each(this.callbacks, (callback) => {
      callback(appUser)
    })
  }

  getCurrentProject() {
    return this.currentProject
  }

  setCurrentProject(project) {
    this.currentProject = project

    store.dispatch(setCurrentProject(
      project
    ))
  }

  refreshCurrentProject() {
    getProjectAsync(store.getState().currentProject.id).then((project) => {
      store.dispatch(setCurrentProject(project))
    })
  }

  refreshCurrentSprint() {
    getSprintAsync(store.getState().currentSprint.id).then((sprint) => {
      store.dispatch(setCurrentSprint(sprint))
    })
  }

  parsePath(pathString) {
    let currentProjectId = null;
    let currentSprintId = null;
    let currentTaskId = null;

    let parsedPath = (new RegExp('project/([^//]+)/sprint/([^//]+)/task/([^//]+)')).exec(pathString)

    if (parsedPath != null) {
      currentTaskId = parsedPath[3]
      currentSprintId = parsedPath[2]
      currentProjectId = parsedPath[1]
    }

    parsedPath = (new RegExp('project/([^//]+)/sprint/([^//]+)')).exec(pathString)

    if (parsedPath != null) {
      currentSprintId = parsedPath[2]
      currentProjectId = parsedPath[1]
    }

    parsedPath = (new RegExp('project/([^//]+)')).exec(pathString)

    if (parsedPath != null) {
      currentProjectId = parsedPath[1]
    }

    // compare and set and load
    const {
      currentProject,
      currentSprint,
      currentTask
    } = store.getState()

    if (!currentTaskId && currentTask !== null) {
      store.dispatch(setCurrentTask(null))
    } else {

    }

    if (!currentSprintId) {
      store.dispatch(setCurrentSprint(null))
    } else {
      if ((currentSprint && currentSprint.id !== currentSprintId) || !currentSprint) {
        getSprintAsync(currentSprintId).then((sprint) => {
          store.dispatch(setCurrentSprint(sprint))
        })
      }
    }

    if (!currentProjectId) {
      store.dispatch(setCurrentProject(null))
    } else {
      if ((currentProject && currentProject.id !== currentProjectId) || (!currentProject && currentProjectId)) {
        getProjectAsync(currentProjectId).then((project) => {
          store.dispatch(setCurrentProject(project))
        })
      }
    }
  }

  setHistory(history) {
    this.history = history
  }

  goToUser(userId) {
    console.log('go to user' + userId)

    this.history.push(`/`)
  }

  goToProject(projectId) {
    console.log('go to project' + projectId)

    this.history.push(`/project/${projectId}`)
  }

  goToSprint(projectId, sprintId) {
    console.log('go to sprint' + sprintId)

    this.history.push(`/project/${projectId}/sprint/${sprintId}`)
  }

  subscribeToAppUserChanged(cb) {
    this.callbacks[this.nextCallBackId] = cb;

    this.nextCallBackId += 1

    return this.nextCallBackId - 1
  }

  unsubscribeToAppUserChanged(callbackId) {
    if (_.has(this.callbacks, callbackId)) {
      delete this.callbacks[callbackId]
    }
  }
}

const instance = new AppData()

export default instance
