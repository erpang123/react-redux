import React from 'react'
import axios from 'axios'
import ReactStar from './reactstar'

class MessageInfo extends React.Component{
	constructor (props) {
		super(props)
    this.state = {
      admin_info: []
    }
	}
  componentWillMount () {
    axios({
      url: '/api/message',
      method: 'get'
    }).then((res) => {
      let datajson = JSON.parse(res.data).ratings
      var goodMath = 0
      var badMath = 0
      for (let i in datajson) {
        let _this = datajson[i]
        if (_this.score >= 3) {
          goodMath++
        } else {
          badMath++
        }
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
      this.setState({
        admin_info: datajson
      })
      // this.$parent.li_list[0].li_math = datajson.length
      // this.$parent.li_list[1].li_math = goodMath
      // this.$parent.li_list[2].li_math = badMath
      // this.admin_info = datajson
      // this.all_info = datajson
      // (idx, idy) => {
      //   var goodList = []
      //   var badList = []
      //   if (idx === 0) {
      //     this.admin_info = this.all_info
      //   } else if (idx === 1) {
      //     for (let i in this.all_info) {
      //       if (this.all_info[i].score >= 3) {
      //         goodList.push(this.all_info[i])
      //       }
      //     }
      //     this.admin_info = goodList
      //   } else if (idx === 2) {
      //     for (let i in this.all_info) {
      //       if (this.all_info[i].score < 3) {
      //         badList.push(this.all_info[i])
      //       }
      //     }
      //     this.admin_info = badList
      //   }
      //   this.reload_info(this.admin_info, idy)
      // }
    }).catch((error) => {
      console.log(error)
    })
  }
	render () {
		return (
			<div className="score-info-lists">
        {
          this.state.admin_info.map((list, index) => {
            return (
              <div className="score-info-list" key={index}>
                <img className="admin-img" src={list.avatar}></img>
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
