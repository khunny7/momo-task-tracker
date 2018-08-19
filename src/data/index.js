import _ from 'underscore'
import { getUserAsync } from '../repository/firebase-user-repository'

class AppData {
  constructor() {
    this.currentAuthUser = null;
    this.currentAppUser = null;
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

    _.each(this.callbacks, (callback) => {
      callback(appUser)
    })
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
