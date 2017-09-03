import { SET_MESSAGE } from '../action/actiontype'

const setMessageInfo = (state = {}, action) => {
	switch (action.type) {
		case SET_MESSAGE:
			return action.messageInfo
		default:
			return state
	}
}

export { setMessageInfo }
