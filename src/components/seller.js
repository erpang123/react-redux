import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import dispatchAction from '../dispatch/dispatchAction'
import Food from './food'

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
    axios.get('/api/seller').then((res) => {//请求产品的数据列表
      let data = JSON.parse(res.data)
      let cartlist = []
      for (let i = 0; i < data.goods.length; i++) {
        for (let j in data.goods[i].foods) {
          let name = data.goods[i].foods[j].name
          let price = data.goods[i].foods[j].price
          let obj = {
            name: name,
            math: 0,
            price: price
          }
          cartlist.push(obj)//将产品的名称，个数，价格存储到产品的数组列表中
        }
      }
      cartlist.all_num = 0
      cartlist.price = 0
      this.props.action.setShopMath(cartlist)
      this.setState({
        shoplists: data.goods
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  componentDidMount () {
    let keys = []
    let goodList = this.state.shoplists
    for (let i = 0; i < goodList.length; i++) {
      keys.push(this.refs['info_index'+i].offsetTop)
    }
    this.setState({
      keys: keys
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
                  <Food foodlist = {item.foods} obj = {this.props.obj} newfoodlist = {this.props.newfoodlist}></Food>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

let mathArray = []
let obj = 1
let mapStateToProps = (state) => {
  obj += 1
  let shopinfo = state.shopinfo
  if (shopinfo instanceof Array) {
    for (let i in shopinfo) {
      mathArray.push(shopinfo[i])
    }
  } else {
    for (let i in mathArray) {
      if (mathArray[i].name == shopinfo.name) {
        mathArray[i].math = shopinfo.math
        break
      }
    }
  }
  return {
    newfoodlist: mathArray,
    obj: obj
  }
}

export default connect(mapStateToProps, dispatchAction)(Index)