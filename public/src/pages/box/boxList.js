import history from './../../configs/history'
import React from 'react';
import './box.less';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

import boxImg from './../../images/logo.png';

export default class BoxList extends React.Component {
	constructor(){
		super()

		this.state = {
			boxList:[]
		}
	}
	componentDidMount(){
		console.log(this.props)
		this.setState({boxList: [1,2,3]})
	}
	render(){
		return (
			<div className="box-list">
				{
					this.state.boxList.map(item => (
						<WingBlank size="lg" key={item}>
							<WhiteSpace size="lg" />
								<Card>
									<Card.Body>
										<div className="box-item" onClick={()=>history.push({pathname:'/box-detail/' + item})}>
											<div className="box-item_img">
												<img src={boxImg} alt="盒子logo" />
											</div>
											<div className="box-item_info">
												<p>78:4e:34:1e:44:fd</p>
												<p><span className="iconfont icon-laptop"> 在线</span></p>
												<p><span className="iconfont icon-location"> 门口</span></p>
												<p><span className="iconfont icon-huixingzhen"> 已绑定</span></p>
											</div>
										</div>
									</Card.Body>
								</Card>
						</WingBlank>
					))
				
				}
				
			</div>
		)
	}
}
