import { combineReducers } from 'redux'
import todo from './redux-reducer'
import todos from './redux-reducer1'

const rootReducer = combineReducers({
  todo,
  todos
})

export default rootReducer
