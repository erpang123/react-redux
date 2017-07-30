import { SET_SHOPMATH } from './action/actiontype'

let setShopMath = (text) => {
	return {
		type: SET_SHOPMATH,
		text
	}
}

export default { setShopMath }
