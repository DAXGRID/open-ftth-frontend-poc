import { createStore } from 'redux'
import reducer from '../reducers'
import throttle from 'lodash/throttle'
import { loadState, saveState } from './localStorage'

const configureStore = () => {
  const persistedState = loadState()
  const store = createStore(reducer, persistedState)

  store.subscribe(throttle(() => {
    saveState({
      features: store.getState().features,
      users: store.getState().users,
      currentUserID: store.getState().currentUserID
    })
  }, 1000))

  return store
}

export default configureStore
