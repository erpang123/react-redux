import { SET_SHOPMATH, GET_FOODINFO, SET_SHOPINFO, SET_BOOLEAN, SET_DOM, SET_MESSAGE } from './actiontype'

let setShopMath = (text) => {
	return {
		type: SET_SHOPMATH,
		text
	}
}

let get_FoodInfo = (text) => {
	return {
		type: GET_FOODINFO,
    foodinfo: text
	}
}

let setShopInfo = (text) => {
  return {
    type: SET_SHOPINFO,
    shopinfo: text
  }
}
let setBoolean = (text) => {
  return {
    type: SET_BOOLEAN,
    cartshow: text
  }
}

let setDom = (text) => {
  return {
    type: SET_DOM,
    domtext: text
  }
}

let setMessage = (text) => {
  return {
    type: SET_MESSAGE,
    messageInfo: text
  }
}

export { setShopMath }
export { get_FoodInfo }
export { setShopInfo }
export { setBoolean }
export { setDom }
export { setMessage }
