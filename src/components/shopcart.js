import React from 'react'
import { connect } from 'react-redux'
import ShopBtn from './shopcart'

class ShopCart extends React.Component {
	constructor (props) {
		super(props)
    this.state = {
      cart_boolean: false,
      cart_bool: false
    }
	}
  clear_info () {

  }
	render () {
    if (this.props.goods.length == 0) {
      return (
        <div></div>
      )
    } else {
      return (
        <div className={this.state.cart_boolean ? "shop-cart" : 'hide'}>
          <div className={this.state.cart_bool ? "shop-cart-alert" : 'hide'}>
            <h6>是否要清空购物车</h6>
            <p>
              <a onClick={this.state.cart_bool = false}>取消</a>
              <i></i>
              <a onClick={() => this.clear_info()}>确定</a>
            </p>
          </div>
          <h5>
            <label>购物车</label>
            <a onClick={this.state.cart_bool = true}>清空</a>
          </h5>
          <div className={this.props.goods.length===0 ? "no-shop" : 'hide'}>还未点餐</div>
          <ul className={this.props.goods.length>0 ? '' : 'hide'}>
            {
              this.props.goods.map((good, index) => {
                return (
                  <li key={index}>
                    <label>{good.name}</label>
                    <div>
                      <span className="good-money">￥{good.price}</span>
                      <ShopBtn food_name={good.name} food_price={good.price} food_math={good.math}></ShopBtn>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      )
    }
	}
}

let mapStateToProps = (state) => {
  let goods = state.shopinfo.foodlist ? state.shopinfo.foodlist : []
  return {
    goods: goods
  }
}

export default connect(mapStateToProps)(ShopCart)
