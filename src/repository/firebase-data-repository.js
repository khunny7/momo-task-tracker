import _ from 'underscore'
import firebase from 'firebase/app'
import AppData from '../data/index'

const createProjectAsync = (project, uid) => {
  const database = firebase.database()
  const newProjectKey = database.ref().child('projects').push().key

  const projectData = _.extend({
    id: newProjectKey,
    timeStamp: firebase.database.ServerValue.TIMESTAMP,
  }, project)

  var updates = {};
  updates['/projects/' + newProjectKey] = projectData
  updates['/users/' + uid + '/projectPreviews/' + newProjectKey] = _getProjectPreviewFromProject(projectData)

  return database.ref().update(updates)
}

const getProjectAsync = (pid) => {
  return firebase.database().ref('/projects/' + pid).once('value').then((snapshot) => {
    return snapshot.val();
  });
}

const createSprintAsync = (sprint, pid) => {
  const database = firebase.database()
  const newSprintKey = database.ref().child('sprints').push().key

  const sprintData = _.extend({
    id: newSprintKey,
    timeStamp: firebase.database.ServerValue.TIMESTAMP,
  }, sprint)

  var updates = {};
  updates['/sprints/' + newSprintKey] = sprintData

  return _getUpdatedProjectDataAsync(pid, sprintData).then((updatedProjectData) => {
    updates['/projects/' + pid] = updatedProjectData

    const projectPreview = _getProjectPreviewFromProject(updatedProjectData)

    updates['/users/' + AppData.getCurrentAppUser().uid + '/projectPreviews/' + projectPreview.id] = projectPreview

    return database.ref().update(updates).then(() => {
      return sprintData
    })
  })
}

const getSprintAsync = (sid) => {
  return firebase.database().ref('/sprints/' + sid).once('value').then((snapshot) => {
    return snapshot.val();
  });
}

const _getTaskPreviewFromTask = (task) => {
  const taskPreview = {
    id: task.id,
    name: task.name,
    timeStamp: task.timeStamp,
  }

  let timeSpent = 0;

  _.each(task.runs, (run) => {
    timeSpent += run.end - run.start
  })

  taskPreview.timeSpent = timeSpent

  return taskPreview
}

const _getSprintPreviewFromSprint = (sprint) => {
  const sprintPreview = _.omit(sprint, 'taskPreviews')

  return sprintPreview
}

const _getProjectPreviewFromProject = (project) => {
  const projectPreview = _.omit(project, 'sprintPreviews')

  return projectPreview
}

const _getUpdatedSprintDataAsync = (sid, taskData) => {
  return getSprintAsync(sid).then((sprintData) => {
    sprintData.taskPreviews = sprintData.taskPreviews ? sprintData.taskPreviews : {}

    // TODO: here task can only be added not updated
    sprintData.taskPreviews[taskData.id] = _getTaskPreviewFromTask(taskData)
    sprintData.progress = sprintData.progress ?
      sprintData.progress + _getTaskPreviewFromTask(taskData).timeSpent :
      _getTaskPreviewFromTask(taskData).timeSpent
    sprintData.timeStamp = firebase.database.ServerValue.TIMESTAMP

    return sprintData
  })
}

const _getUpdatedProjectDataAsync = (pid, sprintData) => {
  return getProjectAsync(pid).then((projectData) => {
    // Add sprint preview and increment the goal
    projectData.sprintPreviews = projectData.sprintPreviews ? projectData.sprintPreviews : {}

    const sprintPreview = _getSprintPreviewFromSprint(sprintData)

    projectData.sprintPreviews[sprintPreview.id] = sprintPreview
    projectData.goal = _.reduce(projectData.sprintPreviews, (memo, value) => {
      return memo + value.goal
    }, 0)
    projectData.progress = _.reduce(projectData.sprintPreviews, (memo, value) => {
      return memo + value.progress
    }, 0)
    projectData.timeStamp = firebase.database.ServerValue.TIMESTAMP

    return projectData
  })
}

const createTaskAsync = (task, sid, pid) => {
  const database = firebase.database()
  const newTaskKey = database.ref().child('tasks').push().key

  const taskData = _.extend({
    id: newTaskKey,
    timeStamp: firebase.database.ServerValue.TIMESTAMP,
  }, task)

  const updates = {};
  updates['/tasks/' + newTaskKey] = taskData

  return _getUpdatedSprintDataAsync(sid, taskData).then((updatedSprintData) => {
    updates['/sprints/' + sid] = updatedSprintData

    return _getUpdatedProjectDataAsync(pid, updatedSprintData).then((updatedProjectData) => {
      updates['/projects/' + pid] = updatedProjectData

      const projectPreview = _getProjectPreviewFromProject(updatedProjectData)

      updates['/users/' + AppData.getCurrentAppUser().uid + '/projectPreviews/' + updatedProjectData.id] = projectPreview

      return database.ref().update(updates).then(() => {
        return taskData
      })
    });
  })
}

const updateTaskAsync = (task, sid) => {
  return
}

export {
  createProjectAsync,
  getProjectAsync,
  createSprintAsync,
  getSprintAsync,
  createTaskAsync,
}
