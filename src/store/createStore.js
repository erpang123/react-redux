import { createStore, applyMiddleware, compose } from 'redux'
import getCombineReducers from '../reducer/root-reducer'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import request from '../request/request'

import { todo } from '../reducer/reducer1'
import { todos } from '../reducer/reducer2'
import { setshopinfo } from '../reducer/reducer3'
import { setCartShow } from '../reducer/reducer4'
import { setDom } from '../reducer/reducer5'
import { setMessageInfo } from '../reducer/messageInfo'

export default (initState = {}) => {
  const enhancers = []
  let AllReducer = {shopinfo: todo, foodinfo: todos, setshopinfo: setshopinfo, cartshow: setCartShow, domtext: setDom, messageInfo: setMessageInfo}
  let middleware = [thunk, request, logger]
	const store = createStore(
		getCombineReducers(AllReducer),
    initState,
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension && window.devToolsExtension()
    )
	)
  return store
}
