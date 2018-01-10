import React from 'react'
import { connect } from 'react-redux'

import Raing from './raing'
import ShopBtn from './shop-btn'
import dispatchAction from '../dispatch/dispatchAction'

class FoodInfo extends React.Component {
	constructor (props) {
		super(props)
    this.state = {
      select_index: 0,        //默认选中评价选项卡中的全部
      select_p: false,        //是否开启有内容的评价的筛选
      detail_bool: true,
      static_info: [],
      admin_info: [],
      foodDomInfo: {},
      li_list: [
        {
          li_name: '全部',
          li_math: 57
        },
        {
          li_name: '推荐',
          li_math: 47
        },
        {
          li_name: '吐槽',
          li_math: 10
        }
      ]
    }
	}
  //当props发生改变的时候触发
  componentWillReceiveProps (nextProps) {
    let {foodinfo, shopinfo} = nextProps
    let {li_list} = this.state
    let newFoodInfo = {}
    let ratings = foodinfo.ratings
    //获取redux中存储在购物车中的相同的产品的信息
    if (shopinfo.length > 0) {
      for (let obj of shopinfo) {
        if (foodinfo.name === obj.name) {
          newFoodInfo = obj
          break
        }
      }
    } else {
      newFoodInfo = {
        name: foodinfo.name,
        price: foodinfo.price,
        math: 0
      }
    }
    this.setState({
      static_info: ratings,
      admin_info: ratings,
      foodDomInfo: newFoodInfo
    })
  }
  //评价中的全部，推荐，吐槽选项卡的切换
  get_rating (index) {
    let {select_p} = this.state//是否筛选有内容的评价
    this.setState({
      select_index: index      //存储选中哪一个选项卡
    })
    this.filterInfo(index, select_p)
  }
  //是否筛选有内容的评价
  get_info () {
    let {select_index, select_p} = this.state
    this.setState({
      select_p: !select_p
    })
    this.filterInfo(select_index, !select_p)
  }
  //筛选评价为好，差，所有的操作
  filterInfo (liIndex, allbool) {
    let goodList = []     //好评列表
    let badList = []      //差评列表
    let idx = liIndex     //筛选中的全部，推荐，吐槽（0,1,2）
    let idy = allbool     //是否只看有内容的评价（true，false）
    let {static_info} = this.state
    if (idx === 0) {
      this.reload_info(static_info, idy)
    } else if (idx === 1) {
      for (let i in static_info) {
        if (static_info[i].rateType === 0) {
          goodList.push(static_info[i])
        }
      }
      this.setState({
        admin_info: goodList
      })
      this.reload_info(goodList, idy)
    } else if (idx === 2) {
      for (let i in static_info) {
        if (static_info[i].rateType !== 0) {
          badList.push(static_info[i])
        }
      }
      this.setState({
        admin_info: badList
      })
      this.reload_info(badList, idy)
    }
  }
  //筛选是否显示有内容的数据
  reload_info (obj, bool) {
    let info = []
    if (bool) {
      for (let i in obj) {
        if (obj[i].text !== '') {
          info.push(obj[i])
        }
      }
      this.setState({
        admin_info: info
      })
    } else {
      this.setState({
        admin_info: obj
      })
    }
  }
  //返回产品列表
  back_page () {
    let dom = this.refs.animateview
    dom.classList.add('leave-view')
    this.refs.backIcon.style.display = 'none'
    setTimeout(() => {
      this.props.action.get_FoodInfo({})
    },1000)
  }
  //加入购物车
  addShopInfo () {
    let foodDomInfo = this.state.foodDomInfo
    let {shopinfo} = this.props
    foodDomInfo.math++
    this.setState({
      foodDomInfo: foodDomInfo
    })
    shopinfo.push(foodDomInfo)
    this.props.action.setAllSum(foodDomInfo.price)
    this.props.action.setAllNum(1)
    this.props.action.setShopMath(shopinfo)
  }
	render () {
    let {foodinfo} = this.props
    let {foodDomInfo, li_list, select_index, select_p, admin_info} = this.state
    if (foodinfo && JSON.stringify(foodinfo) != '{}'){
      //初始化评价信息
      let ratings = foodinfo.ratings
      let AllRMath = ratings.length
      let GoodRMath = 0  //好评
      let badRMath = 0   //差评
      for (let rating of ratings) {
        if (rating.rateType === 0) {
          GoodRMath++
        } else {
          badRMath++
        }
      }
      li_list[0].li_math = AllRMath
      li_list[1].li_math = GoodRMath
      li_list[2].li_math = badRMath
      return (
        <div ref='animateview' className="detail-info animate-view">
          <img className="info-img" src={foodinfo.image}/>
          <div className="detail-info-title">
            <h6>{foodinfo.name}</h6>
            <p>
              <label>月售{foodinfo.sellCount}份</label>
              {
                foodinfo.rating != '' ? <label>好评率{foodinfo.rating}</label> : ''
              }
            </p>
            <div className="detail-info-money">
              <p>
                <label>￥{foodinfo.price}</label>
                {
                  foodinfo.oldPrice != '' ? <label>￥{foodinfo.oldPrice}</label> : ''
                }
              </p>
              {
                foodDomInfo.math <= 0 ? <a onClick = {() => this.addShopInfo()}>加入购物车</a> : 
                <div className="show-seller">
                  <ShopBtn food={foodDomInfo}></ShopBtn>
                </div>
              }
            </div>
          </div>
          <div className="detail-info-desc">
            <h6>商品介绍</h6>
            <div>{foodinfo.info}</div>
          </div>
          <div className="detail-info-view">
            <h6>商品评价</h6>
            <ul className="detail-info-banner">
              {
                li_list.map((list, index) => {
                  return (
                    <li key={index} onClick={() => this.get_rating(index)} className={select_index == index ? 'li-active': ''} >{list.li_name}<small>{list.li_math}</small></li>
                  )
                })
              }
            </ul>
            <p className={select_p ? 'detail-con-degree success-active': 'detail-con-degree'} onClick={() => this.get_info()}>只看有内容的评价</p>
            <Raing raingInfo={admin_info}></Raing>
          </div>
          <a ref="backIcon" className="back" onClick={() => this.back_page()}></a>
        </div>
      )
    } else {
      return null
    }
	}
}

let mapStateToProps = (state) => {
  let shopinfo = Object.assign([], state.shopinfo)
  return {
    foodinfo: state.foodinfo,
    shopinfo: shopinfo
  }
}

export default connect(mapStateToProps, dispatchAction)(FoodInfo)
