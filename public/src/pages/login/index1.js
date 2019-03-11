import React from 'react';
import {InputItem} from 'antd-mobile';

import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
	username: Yup.string().required('请稍入用户名'),
	password: Yup.string().required('请稍入密码'),
})

const validateUsername = (value) => {
	let error = ''
	if(!value) {
		error = '请输入用户名'
	}
	return error
}
const validatePassword = value => {
	let error = ''
	if(!value) {
		error = '请输入密码'
	}
	return error
}
const validatePasswordAgain = value => {
	let error = ''
	if(!value) {
		error = '请输入确认密码'
	}
	return error
}

const Login = () => (
	<div>
		<h1>登录</h1>
		<Formik
			initialValues = {{username: '', password: ''}}
			validationSchema={SignupSchema}
			onSubmit={(values, actions) => {
				console.log(values)
			}}
			>
			{
				({values, errors, touched})=> (
					<Form>
						
						<Field type="text" name="username"/>
						<ErrorMessage name="username"></ErrorMessage>
						<Field type="password" name="password" />
						{errors.password && touched.password && errors.password}
						<button type="submit">登录</button>
					</Form>
				)
			}
			
		</Formik>

		<h1>注册</h1>
		<Formik
			initialValues={{
				username: '',
				password: '',
				passwordAgain:''
			}}
			onSubmit={(values, actions) => {
				if(values.password !== values.passwordAgain) {
					alert('两次输入密码不一致！')
					actions.setSubmitting(false)
				}
				console.log(values)
			}}
			>
			<Form>
				<Field name="username" validate={validateUsername}></Field>
				<ErrorMessage name="username"></ErrorMessage>
				<Field name="password" type="password" validate={validatePassword}></Field>
				<ErrorMessage name="password"></ErrorMessage>
				<Field name="passwordAgain" type="password" validate={validatePasswordAgain}></Field>
				<ErrorMessage name="passwordAgain"></ErrorMessage>
				<button type="submit">注册</button>
			</Form>
		</Formik>
	</div>
)

export default Login