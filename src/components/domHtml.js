import React from 'react'

class DomHtml extends React.Component {
	constructor (props) {
    super(props)
  }
  render () {
    console.log(this.props.foods)
    return (
      <div>
        <p>{this.props.foods.aa[0].a}</p>
        <p>{this.props.foods.aa[0].b}</p>
        <p>{this.props.foods.aa[0].c}</p>
      </div>
    )
  }
}

export default DomHtml