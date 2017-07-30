import React from 'react'
import Food from './food'
import axios from 'axios'

class Index extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      shoplists: [],
      selet: 0,
      keys: []
    }
  }
  componentWillMount () {
    axios.get('/api/seller').then((res) => {
      let data = JSON.parse(res.data)
      let keys = []
      this.setState({
        shoplists: data.goods
      })
      for(let i = 0; i < data.goods.length; i++){
        keys.push(this.refs['info_index'+i].offsetTop)
      }
      this.setState({
        keys: keys
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  select_this (index) {
    this.setState({
      selet: index
    })
    let i = 'info_index' + index
    this.refs[i].scrollIntoView()
  }
  scroll_index () {
    let scrollTop = Math.ceil(this.refs.scroll_view.scrollTop)
    for (let i in this.state.keys) {
      let j = parseInt(i) + 1
      if (j === this.state.keys.length) {
        if (scrollTop > this.state.keys[i]) {
          this.setState({
            selet: i
          })
          break
        }
      } else {
        if (scrollTop >= this.state.keys[i] && scrollTop < this.state.keys[j]) {
          this.setState({
            selet: i
          })
          break
        }
      }
    }
  }
  render () {
    return (
      <div className="page-content">
        <div className="left-nav">
          {
            this.state.shoplists.map((item, index) => {
              return (
                <div onClick={() => this.select_this(index)} className={index == this.state.selet ? 'p-active' : ''} key={index}>
                  <p>
                    <label>{item.name}</label>
                  </p>
                </div>
              )
            })
          }
        </div>
        <div className="right-show" ref="scroll_view" onScroll={() => this.scroll_index()}>
          {
            this.state.shoplists.map((item, index) => {
              return (
                <div key={index}>
                  <p className="info-title" ref={"info_index"+index}>{item.name}</p>
                  <Food foodlist = {item.foods}></Food>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Index