import React from 'react'
import ReactDOM from 'react-dom'
import ReactMain from './components/react-main'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import RootReducer from './reducer/root-reducer'
import './css/main.css'

const store = createStore(RootReducer)

ReactDOM.render(
	<Provider store = {store} key="provider">
		<ReactMain />
	</Provider>,
	document.getElementById('app')
)