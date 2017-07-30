import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { setShopMath } from '../action/action1'
import * as AllAction from '../action/action1'

class ShopBtn extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      math: 0
    }
  }
  code_math (e) {
    let math = parseInt(this.state.math) - 1
    if (math < 0) {
      math = 0
    }
    this.setState({
      math: math
    })

    let { store } = this.context
    let foodName = this.props.foodName
    let foodPrice = this.props.foodPrice
    let obj = {
      name: foodName,
      math: math,
      price: foodPrice
    }
    // store.dispatch(setShopMath(obj))
    this.props.action.setShopMath(obj)
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  add_math (e) {
    let math = parseInt(this.state.math) + 1
    this.setState({
      math: math
    })
    let { store } = this.context
    let foodName = this.props.foodName
    let foodPrice = this.props.foodPrice
    let obj = {
      name: foodName,
      math: math,
      price: foodPrice
    }
    // store.dispatch(setShopMath(obj))
    // mapDispatchToProps.actions(obj)
    this.props.action.setShopMath(obj)
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
	render () {
		return (
			<div className="set-math">
			    <span className={this.state.math == 0 ? 'hide' : 'code-btn'} onClick={(e) => this.code_math(e)}></span>
			    <label data-value={this.state.math}>{this.state.math}</label>
			    <span className="add-btn" ref='add_btn' onClick={(e) => this.add_math(e)}></span>
			</div>
		)
	}
}

let mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators(AllAction, dispatch)
  }
}
// ShopBtn.contextTypes = {
//   store: React.PropTypes.object
// }

// export default ShopBtn
export default connect(null, mapDispatchToProps)(ShopBtn)