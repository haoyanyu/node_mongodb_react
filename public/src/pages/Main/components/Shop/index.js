import React from 'react';
import './index.less';

class ShopIndex extends React.Component {
	constructor(){
		super()

		this.state = {
			assistantList:[]
		}
	}
	componentDidMount(){
		this.setState({assistantList: [1,2,3,4,5,6,7,8,9,10]})
	}
	render(){
		let {assistantList} = this.state
		return (
			<div className="page-shop">
				<div className="add-shop">
					<p>
						<span className="iconfont icon-home"></span>
						<span> 添加店铺</span>
					</p>
				</div>
				<div className="assistants">
					<p>店铺成员<i>(共：12 人)</i></p>
					<div className="assistant">
						{
							assistantList.map((item, index) => (
								<div className="list-item" key={item}>
									<p className="iconfont icon-user"></p>
									<p className="info">
										{
											index == 0 ? <span>店长</span> : <span>店员</span>
										}
										<span>13287456789</span>
									</p>
								</div>
							))
						}
					</div>
				</div>
			</div>
		)
	}
}

export default ShopIndex