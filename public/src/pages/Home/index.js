import React from 'react';
import {Button, Tabs} from 'antd-mobile';
import history from './../../configs/history';
import './Home';
import API from './../../api/api';
import {baseURL} from './../../envconfig/envconfig'

class Home extends React.Component {
	constructor(){
		super()

		this.state = { 
			shopList: []
		}
	}
	componentDidMount(){
		this.queryHadShop()
		// console.log(querystring.parse(history.location.search.split('?')[1]))
	}
	// 查询已有店铺
	queryHadShop = () =>{
		API.postAxios(baseURL+'api/shop/queryUserAllShop', {
			username: localStorage.getItem('username')
		}).then( res => {
			this.setState({
				shopList : [...res.data]
			})
		}).catch( err => {
			this.setState({
				shopList : []
			})
		})
	}
	addShop = () => {
		history.push('/add-shop')
	}
	queryData = () => {

	}
	render(){
		let {shopList} = this.state
		const tabs = [
			{title: '实时', sub: 1},
			{title: '历史', sub: 2},
		]
		return (
			<div className="page-home-wrap">
				{shopList.length ? (
						<div className="chart-wrap">
							<Tabs 
							animated={false} 
							useOnPan={false} 
							tabs={tabs} 
							initialPage={1} 
							tabBarUnderlineStyle={{borderColor: '#d28a7c'}}
							tabBarActiveTextColor="#d28a7c"
							onTabClick={this.queryData}>
								<div className="chart-box realTime">实时
									<img src="/images/logo.png" alt=""/>
								</div>
								<div className="chart-box history">历史</div>
							</Tabs>
						</div>
					) : (
						<div className="no-shop">
							<div className="logo-wrap">
								<div className="logo"></div>
							</div>
							<p className="text-center">您还未创建店铺，赶快创建吧</p>
							<Button onClick={this.addShop} className="mt-l" type="primary">创建店铺</Button>
							
						</div>
					)
				}
			</div>
		)
			
			
	}
}

export default Home