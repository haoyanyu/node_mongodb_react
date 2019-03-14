import React from 'react';
import {List, InputItem, Picker, Button, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import {district, getDistrictName} from './../../../configs/district';
import API from './../../../api/api';
import {baseURL} from './../../../envconfig/envconfig';


// less
import './add-shop';

class AddShop extends React.Component {
	constructor(){
		super()
		this.state = {
			city: ''
		}
	}
	componentWillMount(){
		
	}
	addShop = () => {
		this.props.form.validateFields((err, values) => {
			if(err) throw err;
			let params = {
				...values,
				shopCityName: this.state.city,
				shopAdminName: localStorage.getItem('username')
			}
			// console.log(params)
			API.postAxios(baseURL + 'api/shop/addshop', {...params}).then( res => {
				Toast.success(res.desc)
			})
		})
	}
	handleCity = val => {
		// console.log(getDistrictName(val))
		this.setState({
			city: getDistrictName(val).join('')
		})
	}
	render(){
		const {getFieldProps} = this.props.form
		return (
			<div className="page-addshop-wrap">
				<List>
					<InputItem
						{...getFieldProps('merchantName')}
						placeholder="关联品牌"
					>
					<p>品牌</p>
					</InputItem>
					<InputItem
						{...getFieldProps('shopName')}
						placeholder="输入店铺名称，不超过30字"
					>
					<p>店铺名称</p>
					</InputItem>
					<InputItem
						type="phone"
						{...getFieldProps('shopAdminPhone')}
						placeholder="输入手机号"
					>
					<p>手机号</p>
					</InputItem>
					<Picker
						{...getFieldProps('shopCity')}
						title="城市"
						data={district}
						format={(labels) => {return labels[2]}}
						onOk={this.handleCity}
					>
						<List.Item arrow="horizontal">城市</List.Item>
					</Picker>
					<InputItem
						{...getFieldProps('shopAddress')}
						placeholder="输入详细地址"
					>
					<p>详细地址</p>
					</InputItem>
				</List>
				<Button className="mt-l" type="primary" onClick={this.addShop}>确定</Button>
			</div>
		)
	}
}

export default createForm()(AddShop)