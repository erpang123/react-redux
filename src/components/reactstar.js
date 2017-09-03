import React from 'react'

class Star extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      star: [0,1,2,3,4]
    }
  }
	render () {
		return (
			<div className="star-lists">
        {
          this.state.star.map((item, index) => {
            return (
              <a key={index} className={index < this.props.star_active ? 'star-active' : ''}></a>
            )
          })
        }
		  </div>
		)
	}
}

export default Star
