import React from 'react'

class Raing extends React.Component {
	constructor (props) {
		super(props)
	}
  render () {
    return (
      <div className="detail-rating">
        {
          this.props.raingInfo.map((info, index) => {
            return (
              <div className="detail-rating-list" key={index}>
                <div className="detail-rating-title">
                  <p>{info.rateTime}</p>
                  <p>
                    <label>{info.username}</label>
                    <img src={info.avatar}/>
                  </p>
                </div>
                <div className={info.text != '' ? "detail-rating-info" : "hide"}>
                  <i className={"info.rateType == 0" ? 'zan' : 'no-zan'}></i>
                  <p>{info.text}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Raing