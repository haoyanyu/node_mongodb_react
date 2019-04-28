import React from 'react';
import './index';
import logo from './../../../images/logo.png';

class BoxIndex extends React.Component{
	render(){
		return (
			<div>
				<div className="addBox">
					<p>
						<img src={logo} />
						<span>添加盒子</span>
					</p>
				</div>
			</div>
		)
	}
}

export default BoxIndex