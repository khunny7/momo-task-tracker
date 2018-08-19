import firebase from 'firebase/app'

const appUserToDBUser = (appUserData) => {
  const firebaseUserData = {
    uid: appUserData.uid,
    displayName: appUserData.displayName,
    email: appUserData.email,
    photoURL: appUserData.photoURL,
    projectPreviews: appUserData.projectPreviews ? appUserData.projectPreviews : [],
  }

  return firebaseUserData
}

const DBUserToAppUser = (firebaseUserData) => {
  const appUserData = {
    uid: firebaseUserData.uid,
    displayName: firebaseUserData.displayName,
    email: firebaseUserData.email,
    photoURL: firebaseUserData.photoURL,
    projectPreviews: firebaseUserData.projectPreviews ? firebaseUserData.projectPreviews : [],
  }

  return appUserData
}

const getUserAsync = (uid) => {
  var database = firebase.database()
  var userDBRef = database.ref('users').child(uid)

  return userDBRef.once('value').then((snapshot) => {
    if (snapshot.val()) {
      return DBUserToAppUser(snapshot.val())
    }

    return null
  })
}

const saveUserAsync = (userData) => {
  var database = firebase.database()

  return database.ref('users/' + userData.uid).set(appUserToDBUser(userData))
}

export {
  getUserAsync,
  saveUserAsync,
};
