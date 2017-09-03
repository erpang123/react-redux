import React from 'react'
import { connect } from 'react-redux'

import dispatchAction from '../dispatch/dispatchAction'

class ShopBtn extends React.Component{
  constructor (props) {
    super(props)
  }
  code_math (e) {
    let math = parseInt(this.props.foodMath) - 1
    if (math < 0) {
      math = 0
    }
    let foodName = this.props.foodName
    let foodPrice = this.props.foodPrice
    let obj = {
      name: foodName,
      math: math,
      price: foodPrice
    }
    this.props.action.setShopMath(obj)
    e.stopPropagation()
  }
  add_math (e) {
    let math = parseInt(this.props.foodMath) + 1
    let foodName = this.props.foodName
    let foodPrice = this.props.foodPrice
    let obj = {
      name: foodName,
      math: math,
      price: foodPrice
    }
    this.props.action.setShopMath(obj)
    e.stopPropagation()
  }
	render () {
    return (
      <div className="set-math">
          <span className={this.props.foodMath == 0 ? 'hide' : 'code-btn'} onClick={(e) => this.code_math(e)}></span>
          <label>{this.props.foodMath}</label>
          <span className="add-btn" ref='add_btn' onClick={(e) => this.add_math(e)}></span>
      </div>
    )
	}
}

export default connect(null, dispatchAction)(ShopBtn)