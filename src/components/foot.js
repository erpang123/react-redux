import React from 'react'
import { connect } from 'react-redux'

// let foodList = []

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
  setAllNum (obj) {
    // if(!obj){
    //   return {
    //     all_num: 0,
    //     price: 0
    //   }
    // }
    // console.log(obj)
    // let all_num = this.state.all_num
    // let price = this.state.price
    // if (foodList.length > 0) {
    //   for (var i in foodList) {
    //     if (foodList[i].name == obj.name) {
    //       all_num -= foodList[i].math
    //       price -= foodList[i].math*foodList[i].price
    //       all_num += obj.math
    //       price += obj.math*obj.price
    //       foodList[i].math = obj.math
    //       break
    //     } else if (i == foodList.length-1) {
    //       all_num += obj.math
    //       price += obj.math*obj.price
    //       foodList.push(obj)
    //     }
    //   }
    // } else {
    //   all_num += obj.math
    //   price += 4
    //   price += obj.math*obj.price
    //   foodList.push(obj)
    // }
    // return
    // this.setState({
    //   all_num: all_num,
    //   price: price
    // })
  }
  shop_cart () {

  }
  render () {
    return (
      <div className={this.props.all_num>0 ? 'shop-foot has-goods' : 'shop-foot'}>
        <a className="shop-cart-price" onClick={this.shop_cart}></a>
        <a className={this.props.all_num>0 ? 'all-price' : 'all-price hide'}>{this.props.all_num}</a>
        <div className="shop-money">
          <b className="money">￥{this.props.price}</b>
          <label>另需配送费￥{this.state.shipping_fee}元</label>
        </div>
        <div className={this.props.price >= this.state.send_price ? 'pay-money get-pay' : 'pay-money'}>
          <label>￥{this.state.send_price}起送</label>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  let all_num = state.shopinfo.all_num
  let price = state.shopinfo.price
  return {
    all_num: all_num,
    price: price
  }
}

export default connect(mapStateToProps)(Footer)

// Footer.contextTypes = {
//   store: React.PropTypes.object
// }

// export default Footer