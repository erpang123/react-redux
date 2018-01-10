import { SET_SHOPMATH, GET_FOODINFO, SET_SHOPINFO, SET_DOM, SET_MESSAGE, SET_BOOLEAN, SET_ALL_NUM, SET_ALL_SUM } from './actiontype'

export const setShopMath = (text) => {
	return {
		type: SET_SHOPMATH,
		text
	}
}

export const get_FoodInfo = (text) => {
	return {
		type: GET_FOODINFO,
    foodinfo: text
	}
}

export const setShopInfo = (text) => {
  return {
    type: SET_SHOPINFO,
    shopinfo: text
  }
}

export const setBoolean = (text) => {
  return {
    type: SET_BOOLEAN,
    cartshow: text
  }
}

export const setDom = (text) => {
  return {
    type: SET_DOM,
    domtext: text
  }
}

export const setMessage = (text) => {
  return {
    type: SET_MESSAGE,
    messageInfo: text
  }
}

export const setAllNum = (text) => {
  return {
    type: SET_ALL_NUM,
    allNum: text
  }
}

export const setAllSum = (text) => {
  return {
    type: SET_ALL_SUM,
    allSum: text
  }
}
