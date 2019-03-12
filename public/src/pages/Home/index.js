import React from 'react';
import {Button} from 'antd-mobile';
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
	render(){
		let {shopList} = this.state
		return (
			<div className="page-home-wrap">
				{shopList.length ? (
						<div>
							home
						</div>
					) : (
						<div>
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