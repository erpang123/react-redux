import { SET_BOOLEAN } from '../action/actiontype'

const setCartShow = (state = false, action) => {
  switch (action.type){
    case SET_BOOLEAN:
      return action.cartshow
    default:
      return state
  }
}

export { setCartShow }