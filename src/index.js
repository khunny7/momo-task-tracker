import './style.css'
import './css/bootstrap.min.css'
import './css/bootstrap-theme.min.css'
import './css/buttons.less'
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import App from './app'
import storeFactory from './store'

window.store = storeFactory()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path='/' component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app-react-root')
)