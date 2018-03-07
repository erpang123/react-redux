import React from 'react'

import ReactStar from './reactstar'
import MessageInfo from './messageinfo'

class Message extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      li_list: [
        {
          li_name: '全部',
          li_math: 57
        },
        {
          li_name: '满意',
          li_math: 47
        },
        {
          li_name: '不满意',
          li_math: 10
        }
      ],
      ratingInfo: [],
      select_index: 0,            // 全部，好评，差评中选中的哪一项
      all_info: false             // 是否显示有内容的数据
    }
  }
  // 是否显示有内容的数据
  getAllInfo () {
    let {all_info, ratingInfo} = this.state
    this.setState({
      all_info: !all_info
    }, () => {
      this.reloadMath(ratingInfo)
    })
  }
  // 设置全部，好评，差评中的一项
  setIndex (index) {
    this.setState({
      select_index: index
    })
  }
  // 设置全部，好评，差评每个的数据个数
  getMessage () {
    return (obj) => {
      this.setState({
        ratingInfo: obj
      })
      this.reloadMath(obj)
    }
  }
  // 根据是否显示有内容的评价重新计算数据个数
  reloadMath (obj) {
    let static_info = obj
    let goodMath = 0
    let badMath = 0
    let {all_info} = this.state
    for (let info of static_info) {
      if (all_info) {
        if (info.text !== '') {
          if (info.score >= 3) {
            goodMath++
          } else {
            badMath++
          }
        }
      } else {
        if (info.score >= 3) {
          goodMath++
        } else {
          badMath++
        }
      }
    }
    let allMath = parseInt(goodMath) + parseInt(badMath)
    this.setState({
      li_list: [
        {
          li_name: '全部',
          li_math: allMath
        },
        {
          li_name: '满意',
          li_math: goodMath
        },
        {
          li_name: '不满意',
          li_math: badMath
        }
      ]
    })
  }
  render () {
    let {li_list, select_index, all_info} = this.state
    return (
      <div className="admin-message">
        <div className="message-star">
          <div className="message-star-score">
            <p>3.9</p>
            <p>综合评分</p>
            <p>高于周边商家69.2%</p>
          </div>
          <div className="star-cube">
            <div className="message-star-math">
              <label>服务态度</label>
              <ReactStar star_active='4'></ReactStar>
              <span>3.9</span>
            </div>
            <div className="message-star-math">
              <label>服务态度</label>
              <ReactStar star_active='4'></ReactStar>
              <span>4.0</span>
            </div>
            <div className="get-time">
              <label>服务态度</label>
              <span>44分钟</span>
            </div>
          </div>
        </div>
        <div className="admin-info-view">
          <ul className="admin-info-banner">
            {
              li_list.map((list, index) => {
                return (
                  <li key={index} className={select_index == index ? 'li-active' : ''} onClick={() => this.setIndex(index)}>{list.li_name}<small>{list.li_math}</small></li>
                )
              })
            }
          </ul>
          <p className={all_info ? 'admin-info-title success-active' : 'admin-info-title'} onClick={() => this.getAllInfo()}>只看有内容的评价</p>
          <MessageInfo getMessage = {this.getMessage()} liIndex = {select_index} hasInfo = {all_info}></MessageInfo>
        </div>
      </div>
    )
  }
}

export default Message
