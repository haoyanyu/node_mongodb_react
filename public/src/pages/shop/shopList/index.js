import React from 'react';
import {Button, Flex, WhiteSpace, WingBlank} from 'antd-mobile';

import './../shop.less';
import advertising from './../../../images/advertising.png';

import history from './../../../configs/history';

class ShopIndex extends React.Component {

	getInOrders = ()=>{
		history.push('/shop/order-list')
	}

	render(){
		return (
			<div className="shop-page">
				<div className="shop-page__adver">
					<img src={advertising} alt="广告图" />
				</div>
				<WhiteSpace size="xl"></WhiteSpace>
				<WhiteSpace size="xl"></WhiteSpace>
				<div className="shop-page__button">
					<Button className="round_btn blackgold" onClick={()=> history.push('/shop/order-dishes')}>开始点餐</Button>
				</div>
				<WhiteSpace size="xl"></WhiteSpace>
				<WhiteSpace size="xl"></WhiteSpace>
				<WhiteSpace size="xl"></WhiteSpace>
				<WhiteSpace size="xl"></WhiteSpace>
				<div className="shop-page__orders">
					<WingBlank size="lg">
						<Flex>
							<Flex.Item justify="center">
								<div style={{textAlign: 'center'}}>
								<span className="iconfont icon-detail" style={{fontSize: '30px',verticalAlign:'middle',marginRight:'10px'}}></span>
									<span>查询订单</span>
								</div>
							</Flex.Item>
							<Flex.Item justify="center" onClick={this.getInOrders}>
								<div style={{textAlign: 'center',color: '#767676',fontSize:'small'}}>
									<span>查询</span>
									<span className="iconfont icon-doubleright" style={{fontSize:'small',marginLeft:'10px',verticalAlign:'middle'}}></span>
								</div>
							</Flex.Item>
						</Flex>
					</WingBlank>
					
				</div>
			</div>
		)
	}
}

export default ShopIndex