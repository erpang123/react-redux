import React from 'react'
import { connect } from 'react-redux'

import ShopBtn from './shop-btn'
import dispatchAction from '../dispatch/dispatchAction'

class Food extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      foods: this.props.foodlist,
      showprice: true
    }
  }
  sendInfo (food) {
    this.props.action.get_FoodInfo(food)
  }
  render () {
    return (
      <div>
        {
          this.state.foods.map((food, id) => {
            let math = 0
            let newfoodlist = this.props.newfoodlist
            for (let i in newfoodlist) {
              if (food.name == newfoodlist[i].name) {
                math = newfoodlist[i].math
                break
              }
            }
            return (
              <div key={id} className="info-lists" onClick = {() => this.sendInfo(food)}>
                <img src={food.icon} />
                <div>
                  <h6 className="food-name">{food.name}</h6>
                  <div className="rating">
                    <label>月售{food.sellCount}份</label>
                    <label>好评率{food.rating}%</label>
                  </div>
                  <div className="price">
                    <a>￥{food.price}{food.math}</a>
                    <a className={food.oldPrice =='' ? 'hide' : ''}>￥{food.oldPrice}</a>
                    <ShopBtn foodName={food.name} foodPrice = {food.price} foodMath = {math}></ShopBtn>
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

export default connect(null, dispatchAction)(Food)
