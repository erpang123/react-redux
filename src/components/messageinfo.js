import React from 'react'
import axios from 'axios'
import ReactStar from './reactstar'

class MessageInfo extends React.Component{
	constructor (props) {
		super(props)
    this.state = {
      admin_info: [],
      static_info: []
    }
	}
  componentWillMount () {
    axios({
      url: '/api/message',
      method: 'get'
    }).then((res) => {
      let datajson = JSON.parse(res.data).ratings
      let goodMath = 0
      let badMath = 0
      for (let i in datajson) {
        let _this = datajson[i]
        let date = new Date(_this.rateTime)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        if (month < 10) {
          month = '0' + month
        }
        let day = date.getDate()
        if (day < 10) {
          day += '0' + day
        }
        let hours = date.getHours()
        if (hours < 10) {
          hours += '0' + hours
        }
        let minutes = date.getMinutes()
        if (minutes < 10) {
          minutes += '0' + minutes
        }
        _this.rateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
      }
      this.props.getMessage(datajson)
      this.setState({
        admin_info: datajson,
        static_info: datajson
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  componentWillReceiveProps (nextProps) {
    let goodList = []                   //好的评价数据
    let badList = []                    //坏的评价数据
    let idx = nextProps.liIndex         //筛选全部，好评，差评的评价
    let idy = nextProps.hasInfo         //是否有内容的评价
    let {static_info} = this.state
    if (idx === 0) {
      this.reload_info(static_info, idy)
    } else if (idx === 1) {
      for (let i in static_info) {
        if (static_info[i].score >= 3) {
          goodList.push(static_info[i])
        }
      }
      this.reload_info(goodList, idy)
    } else if (idx === 2) {
      for (let i in static_info) {
        if (static_info[i].score < 3) {
          badList.push(static_info[i])
        }
      }
      this.reload_info(badList, idy)
    }
  }
  //筛选是否有内容的评价
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
    } else {
      this.setState({
        admin_info: obj
      })
    }
  }
	render () {
    let {admin_info} = this.state
		return (
			<div className="score-info-lists">
        {
          admin_info.map((list, index) => {
            return (
              <div className="score-info-list" key={index}>
                <img className="admin-img" src={list.avatar}/>
                <div className="admin-score-info">
                  <p className="admin-name">
                    <label>{list.username}</label>
                    <label>{list.rateTime}</label>
                  </p>
                  <div className="arrival-view">
                    <ReactStar star_active={list.score}></ReactStar>
                    <a className={list.deliveryTime>0 ? 'arrival-time' : 'arrival-time hide'}>{list.deliveryTime}分钟到达</a>
                  </div>
                  <p className="admin-score">{list.text}</p>
                  <div className="recommend">
                    {
                      list.recommend.map((good, index) => {
                        return (
                          <a key={index}>{good}</a>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
			</div>
		)
	}
}

export default MessageInfo
