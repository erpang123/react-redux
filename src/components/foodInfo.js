import React from 'react'
import { connect } from 'react-redux'

import Raing from './raing'
import dispatchAction from '../dispatch/dispatchAction'

class FoodInfo extends React.Component {
	constructor (props) {
		super(props)
    this.state = {
      select_index: 0,
      select_p: false,
      detail_bool: true,
      static_info: [],
      admin_info: [],
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
  componentWillReceiveProps (nextProps) {
    let ratings = nextProps.foodinfo.ratings
    this.setState({
      static_info: ratings,
      admin_info: ratings
    })
  }
  get_rating (index) {
    this.setState({
      select_index: index
    })
    this.filterInfo(index, this.state.select_p)
  }
  get_info () {
    this.setState({
      select_p: !this.state.select_p
    })
    this.filterInfo(this.state.index, !this.state.select_p)
  }
  filterInfo (liIndex, allbool) {
    let goodList = []
    let badList = []
    let idx = liIndex
    let idy = allbool
    if (idx === 0) {
      // this.setState({
      //   admin_info: this.state.static_info
      // })
      this.reload_info(this.state.static_info, idy)
    } else if (idx === 1) {
      for (let i in this.state.static_info) {
        if (this.state.static_info[i].text != '') {
          goodList.push(this.state.static_info[i])
        }
      }
      console.log(goodList)
      this.setState({
        admin_info: goodList
      })
      this.reload_info(goodList, idy)
    } else if (idx === 2) {
      for (let i in this.state.static_info) {
        if (this.state.static_info[i].text == '') {
          badList.push(this.state.static_info[i])
        }
      }
      this.setState({
        admin_info: badList
      })
      this.reload_info(badList, idy)
    }
  }
  reload_info (obj, bool) {
    let info = []
    if (bool) {
      for (let i in obj) {
        if (obj[i].text !== '') {
          info.push(obj[i])
        }
      }
      this.setState({
        admin_info: info
      })
    }
  }
  back_page () {
    this.refs.animateview.className = this.refs.animateview.className + ' leave-view'
    let dom = this.refs.animateview
    setTimeout(() => {
      this.props.action.get_FoodInfo({})
    },1000)
  }
	render () {
    if (JSON.stringify(this.props.foodinfo) != '{}'){
      return (
        <div ref='animateview' className="detail-info animate-view">
          <img className="info-img" src={this.props.foodinfo.image}/>
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
                    <li key={index} onClick={() => this.get_rating(index)} className={this.state.select_index == index ? 'li-active': ''} >{list.li_name}<small>{list.li_math}</small></li>
                  )
                })
              }
            </ul>
            <p className={this.state.select_p ? 'detail-con-degree success-active': 'detail-con-degree'} onClick={() => this.get_info()}>只看有内容的评价</p>
            <Raing raingInfo={this.state.admin_info}></Raing>
          </div>
          <a className="back" onClick={() => this.back_page()}></a>
        </div>
      )
    } else {
      return null
    }
	}
}

export default connect(null, dispatchAction)(FoodInfo)
