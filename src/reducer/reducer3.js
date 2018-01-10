import { SET_SHOPINFO } from '../action/actiontype'

const setshopinfo = (state={}, action) => {
  switch (action.type) {
    case SET_SHOPINFO:
      return action.shopinfo
    default:
      return state
  }
}

export { setshopinfo }