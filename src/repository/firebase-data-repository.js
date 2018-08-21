import _ from 'underscore'
import firebase from 'firebase/app'
import AppData from '../data/index'
import { getUserAsync } from './firebase-user-repository'

const createProjectAsync = (project, uid) => {
  const database = firebase.database()
  const newProjectKey = database.ref().child('projects').push().key

  const projectData = _.extend({
    id: newProjectKey,
    timeStamp: firebase.database.ServerValue.TIMESTAMP,
  }, project)

  var updates = {};
  updates['/projects/' + newProjectKey] = projectData
  updates['/users/' + uid + '/projectPreviews/' + newProjectKey] = _.omit(projectData, 'sprintPreviews')

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

  return getProjectAsync(pid).then((projectData) => {
    var updates = {};
    updates['/sprints/' + newSprintKey] = sprintData

    // Add sprint preview and increment the goal
    projectData.sprintPreviews = projectData.sprintPreviews ? projectData.sprintPreviews : {}
    projectData.sprintPreviews[newSprintKey] = _.omit(sprintData, 'taskPreviews')
    projectData.goal = projectData.goal ? projectData.goal + sprintData.goal : sprintData.goal
    updates['/projects/' + pid] = projectData

    // Update project previews under the user
    updates['/users/' + AppData.getCurrentAppUser().uid + '/projectPreviews/' + projectData.id + '/goal'] = projectData.goal

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

export {
  createProjectAsync,
  getProjectAsync,
  createSprintAsync,
  getSprintAsync,
}
