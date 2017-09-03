import React from 'react'
import Seller from './seller'
import Good from './good'
import Message from './message'
import Dom from './dom'
import { BrowserRouter, Route, Link, NavLink, Redirect } from 'react-router-dom'

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
