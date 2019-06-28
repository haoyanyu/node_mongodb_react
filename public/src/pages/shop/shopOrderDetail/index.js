import React from 'react';
import {connect} from 'react-redux';
import './../shop.less';

const foodsList = [
	{id: 1,name: '十三香小龙虾', type: '微辣', count: 1, price: 88},
	{id: 2,name: '蒜香小龙虾', type: '微辣', count: 1, price: 118},
	{id: 3,name: '麻辣小龙虾', type: '中辣', count: 2, price: 68},
	{id: 4,name: '酒香小龙虾', type: '微辣', count: 1, price: 39},
	{id: 5,name: '蟹黄小龙虾', type: '微辣', count: 2, price: 188},
	{id: 6,name: '酥脆小龙虾', type: '微辣', count: 1, price: 78},
	{id: 7,name: '虾仁', type: '微辣', count: 1, price: 38},
	{id: 8,name: '麻辣虾仁', type: '特辣', count: 1, price: 98},
	{id: 9,name: '小酥肉', type: '微辣', count: 1, price: 76},
	{id: 10,name: '锅包肉', type: '微辣', count: 1, price: 38},
]

class OrderDetail extends React.Component {
	
	render(){
		const {curOrderDetail} = this.props
		let index = parseInt(Math.random() * 10);
		const foods = foodsList.slice(0, index)
		return (
			<div className="orderdetail-page">
				<div className="orderdetail-page_con">
					<div className="status">
						{
							curOrderDetail.status == 1 ? 
							<React.Fragment>
								<p>取餐码</p>
								<p>080808</p>
							</React.Fragment>
							:
							<React.Fragment>
								<p>已取餐</p>
							</React.Fragment>
						}
					</div>
					<div className="foods">
						<ul>
							{
								foods.map(item => (
									<li key={item.id}>
										<div className="foods-item foods-img">
											<img src={curOrderDetail.img} alt=""/>
										</div>
										<div className="foods-item foods-name">
											<p>{item.name}</p>
											<span>{item.type}</span>
										</div>
										<div className="foods-item foods-count">
											<span>×{item.count || 0}</span>
										</div>
										<div className="foods-item foods-price">
											<span>￥{item.price.toFixed(2)}</span>
										</div>
									</li>
								))
							}
							
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	curOrderDetail: state.curOrderDetail
}))(OrderDetail)