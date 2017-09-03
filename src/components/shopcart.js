import React from 'react'
import ShopBtn from './shop-btn'

class ShopCart extends React.Component {
	constructor (props) {
		super(props)
    this.state = {
      cart_bool: false
    }
	}
  clear_info () {

  }
  clearcube () {
    this.setState({
      cart_bool: true
    })
  }
	render () {
    if (!this.props.cartshow) {
      return null
    } else {
      return (
        <div className="shop-cart">
          <div className={ this.state.cart_bool ? 'shop-cart-alert' : 'hide'}>
            <h6>是否要清空购物车</h6>
            <p>
              <a onClick={ () => {this.setState({cart_bool: false})}}>取消</a>
              <i></i>
              <a onClick={() => this.clear_info()}>确定</a>
            </p>
          </div>
          <h5>
            <label>购物车</label>
            <a onClick={() => {this.clearcube()}}>清空</a>
          </h5>
          <div className={this.props.goods.length===0 ? "no-shop" : 'hide'}>还未点餐</div>
          <ul className={this.props.goods.length>0 ? '' : 'hide'}>
            {
              this.props.goods.map((good, index) => {
                return (
                  <li key={index}>
                    <label>{good.name}</label>
                    <div>
                      <span className="good-money">￥{good.price}</span>
                      <ShopBtn foodName={good.name} foodPrice={good.price} foodMath={good.math}></ShopBtn>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      )
    }
	}
}

ShopCart.defaultProps = {
  goods: [],
  cartshow: false
}

export default ShopCart
