import React from 'react';
import {List, InputItem, Toast, Button} from 'antd-mobile';
import {createForm} from 'rc-form';
import './login';
import API from './../../api/api';
import {baseURL} from './../../envconfig/envconfig';
import history from './../../configs/history';
// import createHistory from 'history/createHashHistory';

// const history = createHistory();

class LoginForm extends React.Component {
	constructor(){
		super()

		this.state = {
			username: localStorage.getItem('username')
		}
		this.handleLogin = this.handleLogin.bind(this)
	}
	handleLogin(){
		this.props.form.validateFields((err, values) => {
			if(err) {
				console.log(err)
				// Toast.info()
				return 
			} 
			API.postAxios(baseURL + 'api/user/login', values).then( res => {
				localStorage.setItem('username', values.username)
				history.push('main/index')
			}).catch(err => {
				Toast.fail(err.desc, 2)
			})
		})
	}
	render(){
		const {getFieldProps,getFieldError} = this.props.form
		// return <div>login</div>
		return (
			<div className="page-login-wrap">
			<div className="logo-wrap">
				<div className="logo"></div>
			</div>
				<List className="mt-l">
					<InputItem
						labelNumber="3"
						{...getFieldProps('username',{
							initialValue: localStorage.getItem('username'),
							rules: [{required: true, message:'用户名必填', trigger: 'blur'}]
						})}
						ref={el => this.userName = el}
						placeholder="请输入用户名"
						error={getFieldError('username')}
						>
					<div className="input-icon text-blue">
						<i className="iconfont icon-user"></i>
					</div>
					</InputItem>
					<InputItem
						labelNumber="3"
						{...getFieldProps('password', {
							rules: [{required: true, message:'密码必填', trigger: 'blur'}]
						})}
						ref={el => this.password = el}
						placeholder="请输入密码"
						type="password"
						error={getFieldError('password')}
						>
					<div className="input-icon text-blue">
						<i className="iconfont icon-unlock"></i>
					</div>
					</InputItem>
				</List>
				<Button className="login-btn" type="primary" onClick={this.handleLogin}>登录</Button>
			</div>
			
		)
	}
}
const Login = createForm()(LoginForm);

export default Login;