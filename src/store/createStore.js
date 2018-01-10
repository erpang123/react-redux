import { createStore, applyMiddleware, compose } from 'redux'
import getCombineReducers from '../reducer/root-reducer'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import request from '../request/request'

import { todo } from '../reducer/reducer1'
import { todos } from '../reducer/reducer2'
import { setshopinfo } from '../reducer/reducer3'
import { setCartShow } from '../reducer/reducer4'
import { setAllNum } from '../reducer/reducer4'
import { setAllSum } from '../reducer/reducer4'
import { setMessageInfo } from '../reducer/messageInfo'

export default (initState = {}) => {
  const enhancers = []
  let AllReducer = {shopinfo: todo, foodinfo: todos, setshopinfo: setshopinfo, cartshow: setCartShow, messageInfo: setMessageInfo, numMath: setAllNum, sumMath: setAllSum}
  let middleware = [thunk, request, logger]
	var a = process.env.NODE_ENV === 'development' ? [
    applyMiddleware(...middleware),
    window.devToolsExtension && window.devToolsExtension() //打包后的文件会提示错误，打包的时候需要去掉
  ] : [applyMiddleware(...middleware)]
  const store = createStore(
		getCombineReducers(AllReducer),
    initState,
    compose(
      ...a
    )
	)
  return store
}
