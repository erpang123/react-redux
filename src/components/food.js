import React from 'react'
import ShopBtn from './shop-btn'
import { get_FoodInfo } from '../action/action1'

class Food extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      foods: this.props.foodlist,
      showprice: true
    }
  }
  sendInfo (food) {
    return () => {
      let { store } = this.context
      store.dispatch(get_FoodInfo(food))
    }
  }
  render () {
    return (
      <div>
        {
          this.state.foods.map((food, id) => {
            return (
              <div key={id} className="info-lists" onClick = {this.sendInfo(food)}>
                <img src={food.icon}></img>
                <div>
                  <h6 className="food-name">{food.name}</h6>
                  <div className="rating">
                    <label>月售{food.sellCount}份</label>
                    <label>好评率{food.rating}%</label>
                  </div>
                  <div className="price">
                    <a>￥{food.price}</a>
                    <a className={food.oldPrice =='' ? 'hide' : ''}>￥{food.oldPrice}</a>
                    <ShopBtn foodName={food.name} foodPrice = {food.price}></ShopBtn>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

Food.contextTypes = {
  store: React.PropTypes.object
}

export default Food
