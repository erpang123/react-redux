import React from 'react'
import { connect } from 'react-redux'

import dispatchAction from '../dispatch/dispatchAction'
import DomHtml from './domHtml'

class Dom extends React.Component {
	constructor (props) {
    super(props)
  }
  setDom () {
    this.props.action.setDom({aa:[{a:123124,b:2222,c:444}]})
  }
  render () {
    return (
      <div>
        <button onClick = {() => this.setDom()}>dom</button>
        <DomHtml foods = {this.props.domtext}></DomHtml>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    domtext: state.domtext
  }
}

export default connect(mapStateToProps, dispatchAction)(Dom)