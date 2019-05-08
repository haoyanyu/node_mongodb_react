import React from 'react';
import './index.less';
import logo from './../../../../images/logo.png';
import history from './../../../../configs/history'

class BoxIndex extends React.Component{
	render(){
		return (
			<div className="page-box">
				<div className="addBox">
					<p>
						<span className="iconfont icon-zhangshangcaifuyemianshoujiban345"></span>
						<span> 添加盒子</span>
					</p>
				</div>
				<div className="setting">
					<p>
						<span className="iconfont icon-setting"></span>
						<span> 配置信息</span>
					</p>
				</div>
				<div className="boxs">
					<div className="title">
						<span>店铺盒子<i>(在线数：2个)</i></span>
						<span onClick={()=>history.push({pathname:'/box-list/123'})}>更多 ></span>
					</div>
					<div className="first-box">
						<span className="iconfont icon-yingjian"></span>
						<div className="info">
							<p>78:4e:34:1e:44:fd</p>
							<p><span className="iconfont icon-laptop">在线</span></p>
							<p><span className="iconfont icon-location">门口</span></p>
							<p><span className="iconfont icon-huixingzhen">已绑定</span></p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default BoxIndex