import { GET_FOODINFO } from '../action/actiontype'

const todos = (state = {}, action) => {
	switch (action.type) {
    case GET_FOODINFO:
      return action.foodinfo
    default:
		  return state
	}
}

export { todos }
