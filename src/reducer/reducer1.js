import { SET_SHOPMATH } from '../action/actiontype'

let foodList = []

const todo = (state = [], action) => {
	switch (action.type) {
		case SET_SHOPMATH:
      		return action.text
		default:
			return state
	}
}

export { todo }
