import { combineReducers } from 'redux'

const getCombineReducers = asyncReducers => {
  return combineReducers({
    ...asyncReducers
  })
}

export default getCombineReducers
