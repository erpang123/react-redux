import React from 'react'
import Bundle from '../bundle'
//同步引入组件
// import Seller from './seller'
// import Good from './good'

import { BrowserRouter, Route, Link, NavLink, Redirect } from 'react-router-dom'
//异步引入组件
let sellerDom = () => import('./seller' /*webpackChunkName: 'seller'*/)
let messageDom = () => import('./message' /*webpackChunkName: 'message'*/)
let goodDom = () => import('./good' /*webpackChunkName: 'good'*/)

const Seller = (props) => (
  <Bundle load={sellerDom}>
    {(Seller) => <Seller {...props}/>}
  </Bundle>
)

const Message = (props) => (
  <Bundle load={messageDom}>
    {(Message) => <Message {...props}/>}
  </Bundle>
)

const Good = (props) => (
  <Bundle load={goodDom}>
    {(Good) => <Good {...props}/>}
  </Bundle>
)

class MyComponent extends React.Component{
  constructor (props) {
    super(props)
  }
	render () {
    return (
      <BrowserRouter>
        <div className="app-content">
          <div className="nav">
            <NavLink to="/seller" activeClassName="link-active">商品</NavLink>
            <NavLink to="/message" activeClassName="link-active">评价</NavLink>
            <NavLink to="/good" activeClassName="link-active">商家</NavLink>
          </div>
          <Redirect from="/" to="/seller"></Redirect>
          <Route path="/seller" component={Seller}></Route>
          <Route path="/message" component={Message}></Route>
          <Route path="/good" component={Good}></Route>
        </div>
      </BrowserRouter>
    )
  }
}

export default MyComponent
