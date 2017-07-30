import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AllAction from '../action/action1'
import img_src from '../assets/shop_img.png'
import axios from 'axios'

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
  getNewInfo () {
    let shopinfo = this.state.shopInfo
    this.props.actions.setShopInfo(shopinfo)
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
          <p><label>{this.state.shopInfo.bulletin}</label></p>
        </div>
      </div>
    )
	}
}

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AllAction, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(ReactHeader)
