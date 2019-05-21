import { createStore } from 'redux'
import reducer from '../reducers'
import throttle from 'lodash/throttle'
import { loadState, saveState } from './localStorage'

const configureStore = () => {
  const persistedState = loadState()
  const store = createStore(reducer, persistedState)

  store.subscribe(throttle(() => {
    saveState({
      routeSegments: store.getState().routeSegments,
    })
  }, 1000))

  return store
}

export default configureStore
