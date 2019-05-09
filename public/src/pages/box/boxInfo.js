import history from './../../configs/history'
import React from 'react';
import './box.less';
import { Card, WingBlank, WhiteSpace, Button, Modal } from 'antd-mobile';


export default class BoxDetail extends React.Component {
	constructor(){
		super()
		this.state = {
			boxInfo:{
				location: 1, //1:门口，2：店中，3：收银
				mac: '78:4e:34:1e:44:fd',
				version: '2.3.1'
			},
		}
	}
	showDialog = (e) => {
		e.preventDefault();
		Modal.operation([{text:'门口',onPress:()=>{this.setState({boxInfo:{location: 1}})}},{text:'店中',onPress:()=>{this.setState({boxInfo:{location: 2}})}},{text:'收银',onPress:()=>{this.setState({boxInfo:{location: 3}})}}],'ios')
	}
	render(){
		return (
			<div className="box-info">
				<WingBlank size="lg">
					<WhiteSpace size="lg" />
					<Card>
						<Card.Header title="盒子详情信息"></Card.Header>
						<Card.Body>
							<div className="box-info_detail">
								<p>MAC地址： {this.state.boxInfo.mac}</p>
								<p>固件版本： {this.state.boxInfo.version}</p>
								<div>
									<p onClick={this.showDialog.bind(this)}>盒子位置：<span className="more" >修改 ></span></p>
									<WhiteSpace />
									<div>
										<Button type="ghost" inline size="small" disabled={!(this.state.boxInfo.location == 1)} style={{marginRight: '4px'}}>门口</Button>
										<Button type="ghost" inline size="small" disabled={!(this.state.boxInfo.location == 2)} style={{marginRight: '4px'}}>店中</Button>
										<Button type="ghost" inline size="small" disabled={!(this.state.boxInfo.location == 3)}>收银</Button>
									</div>
									<WhiteSpace />
								</div>
								<WhiteSpace size="lg"/>
								<div style={{padding: '0 20%'}}>
									<Button type="primary" size="small" style={{borderRadius: '20px'}}>解绑</Button>
								</div>
							</div>
							
						</Card.Body>
					</Card>
				</WingBlank>
				
			</div>
		)
	}
}