import React from 'react'
import {connect} from 'react-redux'
import dispatchAction from '../dispatch/dispatchAction'

import ShopBtn from './shop-btn'

class ShopCart extends React.Component {
	constructor (props) {
		super(props)
    this.state = {
      cart_bool: false,
      goods: []
    }
	}
  clear_info () {

  }
  clearcube () {
    this.setState({
      cart_bool: true
    })
  }
  componentWillReceiveProps (nextProps) {
    let {shopinfo} = nextProps
    let shops = []
    for (let shop of shopinfo) {
      if (shop.math > 0) {
        shops.push(shop)
      }
    }
    this.setState({
      goods: shops
    })
  }
	render () {
    let {cartshow} = this.props
    let {goods, cart_bool} = this.state
    if (!cartshow) {
      return null
    } else {
      return (
        <div className="shop-cart">
          <div className={ cart_bool ? 'shop-cart-alert' : 'hide'}>
            <h6>是否要清空购物车</h6>
            <p>
              <a onClick={ () => {this.setState({cart_bool: false})}}>取消</a>
              <i></i>
              <a onClick={() => this.clear_info()}>确定</a>
            </p>
          </div>
          <h5>
            <label>购物车</label>
            <a onClick={() => {this.clearcube()}}>清空</a>
          </h5>
          <div className={goods.length===0 ? "no-shop" : 'hide'}>还未点餐</div>
          <ul className={goods.length>0 ? '' : 'hide'}>
            {
              goods.map((good, index) => {
                return (
                  <li key={index}>
                    <label>{good.name}</label>
                    <div>
                      <span className="good-money">￥{good.price}</span>
                      <ShopBtn food={good}></ShopBtn>
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
  let shopinfo = state.shopinfo
  let cartshow = state.cartshow
  return {
    shopinfo: shopinfo,
    cartshow: cartshow
  }
}

export default connect(mapStateToProps, dispatchAction)(ShopCart)
