import React from 'react'
import { connect } from 'react-redux'

import dispatchAction from '../dispatch/dispatchAction'

class Footer extends React.Component{
	constructor (props) {
		super(props)
    this.state = {
      price: 0,
      shipping_fee: 4,
      send_price: 20,
      all_num: 0
    }
	}
  shop_cart () {
    event.preventDefault()
    event.stopPropagation()
    if (this.props.allNum>0) {
      this.props.action.setBoolean(true)
    }
  }
  render () {
    return (
      <div className={this.props.allNum>0 ? 'shop-foot has-goods' : 'shop-foot'}>
        <a className="shop-cart-price" onClick={() => this.shop_cart()}></a>
        <a className={this.props.allNum>0 ? 'all-price' : 'all-price hide'}>{this.props.allNum}</a>
        <div className="shop-money">
          <b className="money">￥{this.props.allPrice}</b>
          <label>另需配送费￥{this.state.shipping_fee}元</label>
        </div>
        <div className={this.props.allPrice >= this.state.send_price ? 'pay-money get-pay' : 'pay-money'}>
          <label>￥{this.state.send_price}起送</label>
        </div>
      </div>
    )
  }
}

export default connect(null, dispatchAction)(Footer)
