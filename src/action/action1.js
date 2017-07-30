import { SET_SHOPMATH, GET_FOODINFO, SET_SHOPINFO } from './actiontype'

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

export { setShopMath }
export { get_FoodInfo }
export { setShopInfo }
