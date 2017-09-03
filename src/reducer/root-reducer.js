import { combineReducers } from 'redux'
// import { todo } from './reducer1'
// import { todos } from './reducer2'
// import { setshopinfo } from './reducer3'
// import { setCartShow } from './reducer4'

// const rootReducer = combineReducers({
//   shopinfo: todo,
//   foodinfo: todos,
//   setshopinfo: setshopinfo,
//   cartshow: setCartShow
// })
const getCombineReducers = asyncReducers => {
  return combineReducers({
    ...asyncReducers
  })
}

export default getCombineReducers

// export default rootReducer
