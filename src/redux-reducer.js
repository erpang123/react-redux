import { SET_SHOPMATH } from './action/actiontype'

let foodList = []

const todo = (state = {}, action) => {
	switch (action.type) {
		case SET_SHOPMATH:
      let obj = action.text
      let all_num = 0
      let price = 0
      if(!obj){
        return {
          all_num: all_num,
          price: price
        }
      }
      if (foodList.length > 0) {
        for (var i in foodList) {
          if (foodList[i].name == obj.name) {
            foodList[i].math = obj.math
            break
          } else if (i == foodList.length-1) {
            foodList.push(obj)
          }
        }
      } else {
        foodList.push(obj)
      }
      for(let i in foodList){
        price += foodList[i].price*foodList[i].math
        all_num +=  foodList[i].math
        if (i == 0 && all_num != 0) {
          price += 4
        }
      }
			return {
        all_num: all_num,
        price: price
      }
		default:
			return state
	}
}

export default todo
