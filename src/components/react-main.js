import React from 'react'
import { connect } from 'react-redux'
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
	render () {
    return (
      <div id="main"> 
        <ReactHeader></ReactHeader>
        <ReactContent></ReactContent>
        <FoodInfo foodinfo={this.props.foodinfo}></FoodInfo>
        <ShopInfo shopinfo={this.props.shopinfo}></ShopInfo>
        <Footer></Footer>
        <ShopCart></ShopCart>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    foodinfo: state.foodinfo,
    shopinfo: state.setshopinfo
  }
}

export default connect(mapStateToProps)(MyComponent)
