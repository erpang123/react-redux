import React from 'react'
// import Bundle from '../bundle'
// 同步引入组件
// import Seller from './seller'
// import Good from './good'

import { HashRouter, Route, Link, NavLink, Redirect, Switch } from 'react-router-dom'
// 异步引入组件
let sellerDom = () => import('./seller' /*webpackChunkName: 'seller' */)
let messageDom = () => import('./message' /* webpackChunkName: 'message'*/)
let goodDom = () => import('./good' /* webpackChunkName: 'good'*/)
/* 使用bundle组件实现异步加载 */
// const Seller = (props) => (
//   <Bundle load={sellerDom}>
//     {(Seller) => <Seller {...props}/>}
//   </Bundle>
// )

// const Message = (props) => (
//   <Bundle load={messageDom}>
//     {(Message) => <Message {...props}/>}
//   </Bundle>
// )

// const Good = (props) => (
//   <Bundle load={goodDom}>
//     {(Good) => <Good {...props}/>}
//   </Bundle>
// )

/* 使用react-loadable加载 */
import Loadable from 'react-loadable'
const Loading = () => <div>Loading。。。</div>
const Seller = Loadable({
	loader: sellerDom,
	loading: Loading
})
const Message = Loadable({
	loader: messageDom,
	loading: Loading
})
const Good = Loadable({
	loader: goodDom,
	loading: Loading
})

class MyComponent extends React.Component {
	constructor (props) {
		super(props)
	}
	render () {
    return (
			<HashRouter>
				<div className="app-content">
					<div className="nav">
						<NavLink to="/seller" activeClassName="link-active">商品</NavLink>
						<NavLink to="/message" activeClassName="link-active">评价</NavLink>
						<NavLink to="/good" activeClassName="link-active">商家</NavLink>
					</div>
					<Switch>
						<Route path="/seller" component={Seller}></Route>
						<Route path="/message" component={Message}></Route>
						<Route path="/good" component={Good}></Route>
						<Route path="/" render={() => <Redirect to="/seller"/>}></Route>
						/*<Redirect from='/' to="/seller"/>*/
					</Switch>
				</div>
			</HashRouter>
		)
  }
}

export default MyComponent
