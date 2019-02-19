import React from 'react'
import {
	Form, Input, Button, notification, Icon, Card, Row, Col, Divider
} from 'antd'
import createHistory from 'history/createHashHistory';

const history = createHistory();

class Login extends React.Component{
	constructor(){
		super()

		this.state = {}
	}
	render(){
		return (
			<div className="login-page-wrapper">
				<Card className="box">
					<p>用户登录</p>
					<div className="login-wrapper">
						<Form>
							<Form.Item>
								{
									getFieldDecorator('username',{
										rules: [{required: true, message: '请输入用户名'}]
									})(<Input style={{height: '50px'}} size="large" placeholder="请输入用户名" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
								}
							</Form.Item>
							<Form.Item>
								{
									getFieldDecorator('password',{
										rules: [{required: true, message: '请输入密码'}]
									})(<Input type="password" style={{height: '50px'}} size="large" placeholder="请输入密码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
								}
							</Form.Item>
							<Form.Item style={{textAlign: 'center'}}>
								<Button size="large" type="primary" htmlType="submit" className="login-form-button">登录</Button>
							</Form.Item>
						</Form>
					</div>
				</Card>
			</div>
		)
	}
}

export default Login