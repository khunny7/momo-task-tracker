import C from '../constants'

import { combineReducers } from 'redux'

export const currentUser = (state = null, action) => {
  if (action.type === C.setCurrentUser) {
    return action.payload
  } else {
    return state
  }
}

export const currentProject = (state = null, action) => {
  if (action.type === C.setCurrentProject) {
    return action.payload
  } else {
    return state
  }
}

export const currentSprint = (state = null, action) => {
  if (action.type === C.setCurrentSprint) {
    return action.payload
  } else {
    return state
  }
}

export const currentTask = (state = null, action) => {
  if (action.type === C.setCurrentTask) {
    return action.payload
  } else {
    return state
  }
}

export const taskOnEdit = (state = null, action) => {
  if (action.type === C.setTaskOnEdit) {
    return action.payload
  } else {
    return state
  }
}

export default combineReducers({
  currentUser,
  currentProject,
  currentSprint,
  currentTask,
  taskOnEdit,
})