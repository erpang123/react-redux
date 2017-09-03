import React from 'react'
import { connect } from 'react-redux'

import ReactStar from './reactstar'
import dispatchAction from '../dispatch/dispatchAction'

class ShopInfo extends React.Component {
	constructor (props) {
		super(props)
	}
  hide_info () {
    this.props.action.setShopInfo({})
  }
	render () {
    if (JSON.stringify(this.props.shopinfo) == '{}') {
      return (
        <div></div>
      )
    } else {
      return (
        <div className="shop-info">
          <div>
            <div>
              <h1>{this.props.shopinfo.name}</h1>
              <div className="good-star">
                <ReactStar star_active={this.props.shopinfo.score}></ReactStar>
              </div>
            </div>
            <div>
              <p className="linear">
                <i></i>
                <label>优惠信息</label>
                <i></i>
              </p>
              <div className="linear-cube">
              {
                this.props.shopinfo.supports.map((list, index) => {
                  return (
                    <div key={index} className={list.type==0 ? 'linear-list linear-img1' : list.type==1 ? 'linear-list linear-img2' : list.type==2 ? 'linear-list linear-img3' : list.type==3 ? 'linear-list linear-img4' : list.type==4 ? 'linear-list linear-img5' : 'linear-list'}>{list.description}</div>
                  )
                })
              }
              </div>
            </div>
            <div>
              <p className="linear mar-top">
                <i></i>
                <label>商家公告</label>
                <i></i>
              </p>
              <div className="shop-announ">{this.props.shopinfo.bulletin}</div>
            </div>
            <a className="close" onClick={() => this.hide_info()}></a>
          </div>
        </div>
      )
    }
	}
}

export default connect(null, dispatchAction)(ShopInfo)
