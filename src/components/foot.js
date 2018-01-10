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
    let {allNum} = this.props
    event.preventDefault()
    event.stopPropagation()
    if (allNum>0) {
      this.props.action.setBoolean(true)
    }
  }
  render () {
    let {allNum, allPrice} = this.props
    let {shipping_fee, send_price} = this.state
    return (
      <div className={allNum>0 ? 'shop-foot has-goods' : 'shop-foot'}>
        <a className="shop-cart-price" onClick={() => this.shop_cart()}></a>
        <a className={allNum>0 ? 'all-price' : 'all-price hide'}>{allNum}</a>
        <div className="shop-money">
          <b className="money">￥{allPrice === 0 ? 0 : allPrice + shipping_fee}</b>
          <label>另需配送费￥{shipping_fee}元</label>
        </div>
        <div className={allPrice >= send_price ? 'pay-money get-pay' : 'pay-money'}>
          <label>￥{send_price}起送</label>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  let allNum = state.numMath
  let allPrice = state.sumMath
  return {
    allNum: allNum,
    allPrice: allPrice
  }
}

export default connect(mapStateToProps, dispatchAction)(Footer)
