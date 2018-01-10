import React from 'react'
import { connect } from 'react-redux'

import dispatchAction from '../dispatch/dispatchAction'

class ShopBtn extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      math: this.props.food.math
    }
  }
  componentWillReceiveProps (nextProps) {
    let {food, shopinfo} = nextProps
    let foodName = food.name
    for (let i of shopinfo) {
      if (i.name === foodName) {
        this.setState({
          math: i.math
        })
        break
      }
    }
  }
  code_math (e) {//减少商品
    let {food, shopinfo, numMath, sumMath} = this.props
    let i_index = 0
    numMath--
    sumMath -= food.price
    if (shopinfo.length !== 0) {
      for (let shop of shopinfo) {
        if (shop.name === food.name) {
          shop.math--
          if (shop.math === 0) {
            shopinfo.splice(i_index, 1)
          }
          break;
        }
        i_index++
      }
    }
    this.props.action.setAllSum(sumMath)
    this.props.action.setAllNum(numMath)
    this.props.action.setShopMath(shopinfo)
    e.stopPropagation()
  }
  add_math (e) {//增加商品
    let {food, shopinfo, numMath, sumMath} = this.props
    let newInfo = true
    let obj = {
      name: food.name,
      price: food.price,
      math: food.math
    }
    numMath++
    sumMath += obj.price
    if (shopinfo.length !== 0) {
      for (let shop of shopinfo) {
        if (shop.name === obj.name) {
          shop.math++
          newInfo = false
          break;
        }
      }
    }
    if (newInfo) {
      obj.math++
      shopinfo.push(obj)
    }
    this.props.action.setAllSum(sumMath)
    this.props.action.setAllNum(numMath)
    this.props.action.setShopMath(shopinfo)
    e.stopPropagation()
  }
	render () {
    let {math} = this.state
    return (
      <div className="set-math">
        <span className={math == 0 ? 'hide' : 'code-btn'} onClick={(e) => this.code_math(e)}></span>
        <label>{math}</label>
        <span className="add-btn" ref='add_btn' onClick={(e) => this.add_math(e)}></span>
      </div>
    )
	}
}

let mapStateToProps = (state) => {
  let shopinfo = Object.assign([], state.shopinfo)
  let numMath = state.numMath
  let sumMath = state.sumMath
  return {
    shopinfo: shopinfo,
    numMath: numMath,
    sumMath: sumMath
  }
}

export default connect(mapStateToProps, dispatchAction)(ShopBtn)