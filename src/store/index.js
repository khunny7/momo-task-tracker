import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {
  let result

  console.groupCollapsed(`dispatching action => ${action.type}`)
  console.log('before', JSON.stringify(store.getState()))

  result = next(action)

  let { postings, postingView } = store.getState()

  console.log('after', JSON.stringify(store.getState()))

  console.groupEnd()

  return result
}

export default (initialState = {}) => {
  const store = applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store
}
