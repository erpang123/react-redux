import { SET_BOOLEAN, SET_ALL_NUM, SET_ALL_SUM } from '../action/actiontype'

export const setCartShow = (state = false, action) => {
  switch (action.type){
    case SET_BOOLEAN:
      return action.cartshow
    default:
      return state
  }
}

export const setAllNum = (state = 0, action) => {
  switch (action.type) {
    case SET_ALL_NUM:
      return action.allNum
    default:
      return state
  }
}

export const setAllSum = (state = 0, action) => {
  switch (action.type) {
    case SET_ALL_SUM:
      return action.allSum
    default:
      return state
  }
}
