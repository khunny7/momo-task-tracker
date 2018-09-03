import React from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import Dashboard from './components/dashboard'
import Project from './components/project'
import Sprint from './components/sprint'
import Header from './components/header'
import { Footer } from './components/footer'
import { Route, withRouter } from 'react-router-dom'
import { getUserAsync, saveUserAsync } from './repository/firebase-user-repository'
import AppData from './data/index'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.onLogInClicked = this.onLogInClicked.bind(this)

    this._initFireBase()

    AppData.setHistory(props.history)
  }

  componentWillMount() {
    console.log('component will mount')

    AppData.parsePath(this.props.location.pathname)
  }

  componentWillReceiveProps(newProps) {
    console.log('component will receive props')

    AppData.parsePath(newProps.location.pathname)
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
              }).catch((error) => {
                console.error(error)
              })
            }
          }).catch((error) => {
            console.error(error)
          })
        } else {
          AppData.setCurrentAppUser(null)
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

  render() {
    const showButton = () => {
      if (this.props.currentUser) {
        return null
      } else {
        return <Button onClick={this.onLogInClicked}>Log in</Button>
      }
    }

    return (
      <div>
        <div>
          <Header />
          {showButton()}
          <Dashboard />
          <Route path='/project/:id' component={Project} />
          <Route path='/project/:pid/sprint/:sid' component={Sprint} />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(withRouter(App))
