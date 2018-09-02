import C from '../constants'

const setCurrentUser = (payload) => {
  return {
    type: C.setCurrentUser,
    payload,
  }
}

export {
  setCurrentUser,
}
