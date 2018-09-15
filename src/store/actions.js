import C from '../constants'

const setCurrentUser = (payload) => {
  return {
    type: C.setCurrentUser,
    payload,
  }
}

const setCurrentProject = (payload) => {
  return {
    type: C.setCurrentProject,
    payload,
  }
}

const setCurrentSprint = (payload) => {
  return {
    type: C.setCurrentSprint,
    payload,
  }
}

const setCurrentTask = (payload) => {
  return {
    type: C.setCurrentTask,
    payload,
  }
}

const setTaskOnEdit = (payload) => {
  return {
    type: C.setTaskOnEdit,
    payload,
  }
}

export {
  setCurrentUser,
  setCurrentProject,
  setCurrentSprint,
  setCurrentTask,
  setTaskOnEdit,
}
