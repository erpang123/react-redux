import { combineReducers } from 'redux'
import { todo } from './reducer1'
import { todos } from './reducer2'
import { setshopinfo } from './reducer3'

const rootReducer = combineReducers({
  shopinfo: todo,
  foodinfo: todos,
  setshopinfo: setshopinfo
})

export default rootReducer
