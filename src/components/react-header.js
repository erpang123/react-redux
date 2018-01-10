import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import img_src from '../assets/shop_img.png'
import dispatchAction from '../dispatch/dispatchAction'

class ReactHeader extends React.Component{
	constructor (Props) {
		super(Props)
    this.state = {
      infoLength: 0,
      shopInfo: {},
      infotext: ''
    }
	}
  componentWillMount () {
    axios({
      url: '/api/seller',
      method: 'get'
    }).then((res) => {
      let shopInfo = JSON.parse(res.data).seller
      this.setState({
        shopInfo: shopInfo,
        infoLength: shopInfo.supports.length,
        infotext: shopInfo.supports[0].description
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  componentDidMount () {
    this.moveText()
  }
  moveText () {
    let dom = this.refs.gg_info
    let left = parseInt(dom.style.marginLeft) || 0
    left--
    if (left <= -dom.scrollWidth + 500) {
      left = 0
    }
    dom.style.marginLeft = left + 'px'
    // setTimeout(() => {
    //   this.moveText()
    // }, 50)
  }
  getNewInfo () {
    let shopinfo = this.state.shopInfo
    this.props.action.setShopInfo(shopinfo)
  }
	render () {
    return (
      <div className="bannel">
        <div className="flex-box">
          <img src={img_src}></img>
          <div className="bannel-info">
            <h5>{this.state.shopInfo.name}</h5>
            <p>{this.state.shopInfo.deliveryTime}分钟送达</p>
            <p className="p-text1">{this.state.infotext}</p>
            <div className="bannel-next">
              <label>{this.state.infoLength}个</label>
            </div>
          </div>
        </div>
        <div className="gg-info" onClick={() => this.getNewInfo()}>
          <p><label ref='gg_info'>{this.state.shopInfo.bulletin}</label></p>
        </div>
      </div>
    )
	}
}

export default connect(null, dispatchAction)(ReactHeader)
