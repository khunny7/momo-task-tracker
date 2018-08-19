import Promise from 'bluebird'
import _ from 'underscore'
import firebase from 'firebase/app'

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

export {
  createProjectAsync
}
