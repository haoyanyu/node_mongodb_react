import React from 'react';
import './index.less';
import { List } from 'antd-mobile';

const Item = List.Item;

class MineIndex extends React.Component {
	constructor(){
		super()
	}
	componentDidMount(){
		console.log('Mine componentDidMount')
	}
	componentDidUpdate(){
		console.log('Mine')
	}
	render(){
		return (
			<div className="page-mine">
				<div className="user-info">
					<span className="iconfont icon-user"></span>
					<span> 15000000000</span>
					
					<i className="iconfont icon-qrcode"></i>
					<i className="iconfont icon-bell"></i>
					
				</div>

				<div className="box-info">
					<div className="item">
						<p>13天</p>
						<span>店铺剩余时长</span>
					</div>
					<div className="item">
						<p>10/12</p>
						<span>在线盒子数</span>
					</div>
				</div>

				<List className="my-list">
					<Item arrow="horizontal" onClick={() => {}}>
						店铺详情
					</Item>
					<Item arrow="horizontal" onClick={() => {}}>
						营业额
					</Item>
					<Item arrow="horizontal" onClick={() => {}}>
						设置
					</Item>
				</List>

				<p>联系电话：<a href="tel:15000000000">150-0000-0000</a></p>
				<p>工作时间： 9:00 - 18:00</p>
			</div>
		)
	}
}

export default MineIndex
