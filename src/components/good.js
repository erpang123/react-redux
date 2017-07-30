import React from 'react'
import axios from 'axios'
import ReactStar from './reactstar'

class About extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collect: false,
      shop_info: {},
      shoplist: [],
      infos: [],
      pics: []
    }
  }
  componentWillMount () {
    axios({
      url: '/api/seller',
      method: 'get'
    }).then((res) => {
      let goodslist = JSON.parse(res.data).seller
      this.setState({
        shop_info: goodslist,
        shoplist: goodslist.supports,
        infos: goodslist.infos,
        pics: goodslist.pics
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  setCollect () {
    this.setState({
      collect: !this.state.collect
    })
  }
  render () {
    return (
      <div className="merchants">
        <div className="merchants-title">
          <div className="merchants-title1">
            <div>
              <h6>{this.state.shop_info.name}</h6>
              <div className="merchants-title-star">
                <ReactStar star_active='4'></ReactStar>
                <label>({this.state.shop_info.sellCount})</label>
                <span>月售{this.state.shop_info.sellCount}单</span>
              </div>
            </div>
            <div className={this.state.collect ? 'has-collect collect' : 'collect'} onClick={() => this.setCollect()}>收藏</div>
          </div>
          <div className="merchants-title2">
            <div>
              <p>起送价</p>
              <p>{this.state.shop_info.minPrice}<a>元</a></p>
            </div>
            <div>
              <p>商家配送</p>
              <p>{this.state.shop_info.deliveryPrice}<a>元</a></p>
            </div>
            <div>
              <p>平均配送时间</p>
              <p>{this.state.shop_info.deliveryTime}<a>分钟</a></p>
            </div>
          </div>
        </div>
        <div className="merchants-content">
          <h6>公告与活动</h6>
          <div className="merchants-content-info">{this.state.shop_info.bulletin}</div>
          {
            this.state.shoplist.map((list, index) => {
              return (
                <div key={index} className={list.type==0 ? 'com-info-class com-info-img1' : list.type==1 ? 'com-info-class com-info-img2': list.type==2 ? 'com-info-class com-info-img3' : list.type==3　?　'com-info-class com-info-img4'　: list.type==4　?　'com-info-class com-info-img5' : 'com-info-class'}>{list.description}</div>
              )
            })
          }
        </div>
        <div className="goods-imglist">
          <h6>商家实景</h6>
          <div>
            {
              this.state.pics.map((img, index) => {
                return (
                  <img key={index} src={img}></img>
                )
              })
            }
          </div>
        </div>
        <div className="shops-info">
          <h6>商家信息</h6>
          <div>
            {
              this.state.infos.map((info, index) => {
                return (
                  <p key={index}>{info}</p>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default About