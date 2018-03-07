import React from 'react'
import ReactDOM from 'react-dom'
import ReactMain from './components/react-main'
import createStore from './store/createStore'
import { Provider } from 'react-redux'
import '../mock'
import './css/main.css'

const store = createStore()

ReactDOM.render(
	<Provider store = {store} key="provider">
		<ReactMain />
	</Provider>,
	document.getElementById('app')
)
