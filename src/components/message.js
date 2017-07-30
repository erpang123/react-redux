import React from 'react'
import ReactStar from './reactstar'
import MessageInfo from './messageinfo'

class Message extends React.Component{
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
      select_index: 0,
      all_info: false
    }
  }
  getAllInfo () {
    this.setState({
      all_info: !this.state.all_info
    })
  }
  setIndex (index) {
    console.log(index)
    this.setState({
      select_index: index
    })
  }
  render () {
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
              this.state.li_list.map((list, index) => {
                return (
                  <li key={index} className={this.state.select_index == index ? 'li-active' : ''} onClick={(index) => this.setIndex(index)}>{list.li_name}<small>{list.li_math}</small></li>
                )
              })
            }
          </ul>
          <p className={this.state.all_info ? "admin-info-title success-active" : "admin-info-title"} onClick={() => this.getAllInfo()}>只看有内容的评价</p>
          <MessageInfo></MessageInfo>
        </div>
      </div>
    )
  }
}

export default Message