import React from 'react'
import { connect } from 'react-redux'
import dispatchAction from '../dispatch/dispatchAction'

import ReactHeader from './react-header'
import ReactContent from './react-content'
import FoodInfo from './foodInfo'
import ShopInfo from './shopinfo'
import Footer from './foot'
import ShopCart from './shopcart'

class MyComponent extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      foodinfo: {},
      shopinfo: {}
    }
  }
  sendFood (obj) {
    this.setState({
      foodinfo: obj
    })
  }
  hideBlack () {
    this.props.action.setBoolean(false)
  }
	render () {
    return (
      <div id="main"> 
        <ReactHeader></ReactHeader>
        <ReactContent></ReactContent>
        <FoodInfo></FoodInfo>
        <ShopInfo shopinfo={this.props.shopinfo}></ShopInfo>
        <Footer></Footer>
        <ShopCart cartshow={this.props.cartshow} goods={this.props.cartlist}></ShopCart>
        <div className={this.props.cartshow ? "black" : 'hide'} onClick={() => this.hideBlack()}></div>
      </div>
    )
  }
}

let all_num = 0
let price = 0
let mathArray = []
let mapStateToProps = (state) => {
  let cartlist = state.shopinfo
  let foodlist = []
  let bool = cartlist instanceof Array
  if (!bool) {
    if (Object.keys(cartlist).length > 0) {
      if (mathArray.length == 0) {
        if (cartlist.math != 0) {
          all_num++
          price += parseInt(cartlist.price)
          mathArray.push(cartlist)
        }
      } else {
        for (let i in mathArray) {
          if (mathArray[i].name == cartlist.name) {
            if (mathArray[i].math < cartlist.math) {
              all_num++
              price += parseInt(cartlist.price)
            } else if (mathArray[i].math > cartlist.math) {
              all_num--
              price -= parseInt(cartlist.price)
            }
            mathArray[i].math = cartlist.math
            if (mathArray[i].math == 0) {
              mathArray.splice(i, 1)
            }
            break
          } else if (i == mathArray.length-1) {
            if (cartlist.math != 0) {
              all_num++
              price += parseInt(cartlist.price)
              mathArray.push(cartlist)
            }
          }
        }
      }
    }
  }
  let cartshow = state.cartshow
  return {
    foodinfo: state.foodinfo,
    shopinfo: state.setshopinfo,
    cartlist: mathArray,
    cartshow: cartshow,
    all_num: all_num,
    price: price
  }
}

export default connect(mapStateToProps, dispatchAction)(MyComponent)
