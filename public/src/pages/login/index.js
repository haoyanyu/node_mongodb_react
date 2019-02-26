import React from 'react'
import {
	Form, Input, Button, notification, Icon,
} from 'antd'
import createHistory from 'history/createHashHistory'
import API from '@/api/api'

import './login.less'

const history = createHistory()

class Login extends React.Component {
	constructor(){
		super()
		this.state = {
			form_title: '用户登录1',
			toLogin: true,
		}

	}
	componentDidMount(){
		// this.getImgUrl()
		
	}
	handleSubmit = e => {
		const {form} = this.props
		const {validateFields, getFieldsValue} = form
		e.preventDefault();
		validateFields((err, values) => {
			if(!err) {
				let params = {
					username: getFieldsValue().username,
					password: getFieldsValue().password,
				}
				API.postAxios('api/user/login', params).then(
					res => {
						localStorage.setItem('username', getFieldsValue().username)
						history.push('/home')
						// console.log(res)
					}
				).catch(err => {
					notification.error({
						message: '系统提示',
						description: err.desc,
					})
					// console.log(err)
				}) 
				
			}
		})
		
	}

	toRegist = (flag=true, e) => {
		console.log(flag)
		setTimeout(()=>{
			this.setState({
				form_title: flag ? '用户注册' : '用户登录',
				toLogin: !flag
			})
		},0)
		
	}
	handleRegist = e => {
		const {form} = this.props
		const {validateFields, getFieldsValue} = form
		e.preventDefault();
		validateFields((err, values) => {
			if(!err) {
				let params = {
					username: getFieldsValue().username,
					password: getFieldsValue().password,
					password_again: getFieldsValue().password_again,
				}
				API.postAxios('api/user/register', params).then(
					res => {
						localStorage.setItem('username', getFieldsValue().username)
						history.push('/home')
						// console.log(res)
						// notification.success({
						// 	message: '系统提示',
						// 	description: err.desc,
						// })
					}
				).catch(err => {
					notification.error({
						message: '系统提示',
						description: err.desc,
					})
					// console.log(err)
				}) 
				
			}
		})
	}

	render(){
		// 经 Form.create() 包装过的组件会自带 this.props.form 属性
		const {form} = this.props
		const {getFieldDecorator} = form

		return (
			<div className="login-page-wrap">
				<div className="box">
					<p>{this.state.form_title}</p>
					<div className="login-wrap">
						<Form onSubmit={this.handleSubmit}>
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
							{
								this.state.toLogin ? 
								''
								:
								<Form.Item>
									{
										getFieldDecorator('password_again',{
											rules: [{required: true, message: '请再次输入密码'}]
										})(<Input type="password" style={{height: '50px'}} size="large" placeholder="请再次输入密码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
									}
								</Form.Item>
							}
							<Form.Item style={{textAlign: 'center'}}>
							{
								this.state.toLogin ? 
									<Button size="large" type="primary" htmlType="submit" className="login-form-button">登录</Button>
									:
									<Button size="large" className="login-form-button" onClick={this.toRegist.bind(this,false)}>返回</Button>
							}
							{
								this.state.toLogin ? 
									<Button size="large" className="login-form-button" onClick={this.toRegist}>注册</Button>
									:
									<Button size="large" type="primary" className="login-form-button" onClick={this.handleRegist}>提交</Button>
							}
								
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		)

	}
}

// 经 Form.create() 包装过的组件会自带 this.props.form 属性
const LoginPage = Form.create()(Login)

export default LoginPage