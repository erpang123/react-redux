import React from 'react'
import Raing from './raing'
import { get_FoodInfo } from '../action/action1'

class FoodInfo extends React.Component {
	constructor (props) {
		super(props)
    this.state = {
      select_index: 0,
      select_p: false,
      detail_bool: true,
      li_list: [
        {
          li_name: '全部',
          li_math: 57
        },
        {
          li_name: '推荐',
          li_math: 47
        },
        {
          li_name: '吐槽',
          li_math: 10
        }
      ]
    }
	}
  get_rating (index) {
    return () => {
      this.setState({
        select_index: index
      })
    }
  }
  get_info () {
    return () => {
      this.setState({
        select_p: !this.state.select_p
      })
    }
  }
  back_page () {
    let { store } = this.context
    this.refs.animateview.className = this.refs.animateview.className + ' leave-view'
    let dom = this.refs.animateview
    setTimeout(() => {
      store.dispatch(get_FoodInfo({}))
    },1000)
  }
	render () {
    if (JSON.stringify(this.props.foodinfo) != '{}'){
      return (
        <div ref='animateview' className="detail-info animate-view">
          <img className="info-img" src={this.props.foodinfo.image}></img>
          <div className="detail-info-title">
            <h6>{this.props.foodinfo.name}</h6>
            <p>
              <label>月售{this.props.foodinfo.sellCount}份</label>
              {
                this.props.foodinfo.rating != '' ? <label>好评率{this.props.foodinfo.rating}</label> : ''
              }
            </p>
            <div className="detail-info-money">
              <p>
                <label>￥{this.props.foodinfo.price}</label>
                {
                  this.props.foodinfo.oldPrice != '' ? <label>￥{this.props.foodinfo.oldPrice}</label> : ''
                }
              </p>
            </div>
          </div>
          <div className="detail-info-desc">
            <h6>商品介绍</h6>
            <div>{this.props.foodinfo.info}</div>
          </div>
          <div className="detail-info-view">
            <h6>商品评价</h6>
            <ul className="detail-info-banner">
              {
                this.state.li_list.map((list, index) => {
                  return (
                    <li key={index} onClick={this.get_rating(index)} className={this.state.select_index == index ? 'li-active': ''} >{list.li_name}<small>{list.li_math}</small></li>
                  )
                })
              }
            </ul>
            <p className={this.state.select_p ? 'detail-con-degree success-active': 'detail-con-degree'} onClick={this.get_info()}>只看有内容的评价</p>
            <Raing raingInfo={this.props.foodinfo.ratings}></Raing>
          </div>
          <a className="back" onClick={() => this.back_page()}></a>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
	}
}

FoodInfo.contextTypes = {
  store: React.PropTypes.object
}

export default FoodInfo
