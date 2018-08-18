import React from 'react'
import { Button } from 'react-bootstrap'
import { Dashboard } from './components/dashboard'
import { Project } from './components/project'
import { Sprint } from './components/sprint'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { MockDataRepository } from './repository/mock-data-repository';

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
  }

  onLogInClicked() {
    this.setState({
      currentUser: {
        id: 'u01',
        name: 'Kate Sohng'
      }
    })
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
