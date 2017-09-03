import { SET_DOM } from '../action/actiontype'

const setDom = (state = {aa:[{a:1111,b:2222,c:3333}]}, action) => {
	switch (action.type) {
    case SET_DOM:
      return action.domtext
    default:
		  return state
	}
}

export { setDom }