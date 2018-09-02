import React from 'react'
import { Button } from 'react-bootstrap'
import { Dashboard } from './components/dashboard'
import { Project } from './components/project'
import { Sprint } from './components/sprint'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { getUserAsync, saveUserAsync } from './repository/firebase-user-repository'
import AppData from './data/index'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import storeFactory from './store'
import { setCurrentUser } from './store/actions'

window.store = storeFactory()

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
      currentProject: null,
      currentSprint: null,
      currentTask: null,
    }

    this.onLogInClicked = this.onLogInClicked.bind(this)

    this._initFireBase()
  }

  _initFireBase() {
    if (!this.isFirebaseInitialized) {
      var config = {
        apiKey: "AIzaSyDtLmKovmTaOYQchddI93PzWFGdIYu1Tkk",
        authDomain: "momo-task-tracker.firebaseapp.com",
        databaseURL: "https://momo-task-tracker.firebaseio.com",
        projectId: "momo-task-tracker",
        storageBucket: "momo-task-tracker.appspot.com",
        messagingSenderId: "145685964017"
      };

      firebase.initializeApp(config);

      return firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          return getUserAsync(user.uid).then((savedUser) => {
            if (savedUser) {
              AppData.setCurrentAppUser(savedUser)
              store.dispatch(setCurrentUser({
                savedUser
              }))
            } else {
              const userToSave = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                projectPreviews: null
              }

              return saveUserAsync(userToSave).then(() => {
                AppData.setCurrentAppUser(userToSave)

                store.dispatch(setCurrentUser({
                  userToSave
                }))
              }).catch((error) => {
                console.error(error)
              })
            }
          }).catch((error) => {
            console.error(error)
          })
        } else {
          AppData.setCurrentAppUser(null)

          store.dispatch(setCurrentUser(null))
        }
      })

      this.isFirebaseInitialized = true;
    }
  }

  onLogInClicked() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(googleAuthProvider).then((result) => {
      console.log('user succesfully signed in')
    }).catch((error) => {
      console.error(error)
    })
  }

  componentWillMount() {
    this.setState({
      currentUser: AppData.getCurrentAppUser()
    })

    this.appDataSubscriptionId = AppData.subscribeToAppUserChanged((currentUser) => {
      this.setState({
        currentUser,
      })
    })
  }

  componentWillUnmount() {
    AppData.unsubscribeToAppUserChanged(this.appDataSubscriptionId)
  }

  render() {
    const showDashboard = (props) => (
      <Dashboard
        currentUser={this.state.currentUser}
        history={props.history}
      />
    )

    const showButton = () => {
      if (this.state.currentUser) {
        return null
      } else {
        return <Button onClick={this.onLogInClicked}>Log in</Button>
      }
    }

    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path='/' component={Header} />
            {showButton()}
            <Route exact path='/' component={showDashboard} />
            <Route exact path='/project/:id' component={Project} />
            <Route exact path='/project/:pid/sprint/:sid' component={Sprint} />
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
}

export default App
