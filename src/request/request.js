const getActionType = (type) => {
	console.log(type)
}

export default store => next => action => {
	getActionType(action.type)
  return next(action)
}
