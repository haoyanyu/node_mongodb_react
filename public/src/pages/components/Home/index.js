import React from 'react';
import {Button, Tabs} from 'antd-mobile';
import history from 'Config/history';
import './Home';
import API from '@Api/api';
import {baseURL} from '@envConfig'
import G2 from '@antv/g2'
// redux
import {connect} from 'react-redux'
import Actions from './../../../redux/actions'

class Home extends React.Component {
	constructor(){
		super()

		this.state = { 
			shopList: [],
			nowChartData:[],
			chart: null,
		}
	}
	componentDidMount(){
		this.queryHadShop()
		this.queryData()
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
		// this.props.updateNowChartData()
		setTimeout(()=> {
			let data = [{
				"month": "Jan",
				"city": "Tokyo",
				"temperature": 7
			}, {
				"month": "Jan",
				"city": "London",
				"temperature": 3.9
			}, {
				"month": "Feb",
				"city": "Tokyo",
				"temperature": 6.9
			}, {
				"month": "Feb",
				"city": "London",
				"temperature": 4.2
			}, {
				"month": "Mar",
				"city": "Tokyo",
				"temperature": 9.5
			}, {
				"month": "Mar",
				"city": "London",
				"temperature": 5.7
			}, {
				"month": "Apr",
				"city": "Tokyo",
				"temperature": 14.5
			}, {
				"month": "Apr",
				"city": "London",
				"temperature": 8.5
			}, {
				"month": "May",
				"city": "Tokyo",
				"temperature": 18.4
			}, {
				"month": "May",
				"city": "London",
				"temperature": 11.9
			}, {
				"month": "Jun",
				"city": "Tokyo",
				"temperature": 21.5
			}, {
				"month": "Jun",
				"city": "London",
				"temperature": 15.2
			}, {
				"month": "Jul",
				"city": "Tokyo",
				"temperature": 25.2
			}, {
				"month": "Jul",
				"city": "London",
				"temperature": 17
			}, {
				"month": "Aug",
				"city": "Tokyo",
				"temperature": 26.5
			}, {
				"month": "Aug",
				"city": "London",
				"temperature": 16.6
			}, {
				"month": "Sep",
				"city": "Tokyo",
				"temperature": 23.3
			}, {
				"month": "Sep",
				"city": "London",
				"temperature": 14.2
			}, {
				"month": "Oct",
				"city": "Tokyo",
				"temperature": 18.3
			}, {
				"month": "Oct",
				"city": "London",
				"temperature": 10.3
			}, {
				"month": "Nov",
				"city": "Tokyo",
				"temperature": 13.9
			}, {
				"month": "Nov",
				"city": "London",
				"temperature": 6.6
			}, {
				"month": "Dec",
				"city": "Tokyo",
				"temperature": 9.6
			}, {
				"month": "Dec",
				"city": "London",
				"temperature": 4.8
			}];
			if(this.state.chart) {
				this.state.chart.destroy()
			}
			this.setState({nowChartData: [...data],chart: new G2.Chart({
				container: 'nowChart',
				forceFit: true,
				height: 260,
				padding: [20, 50, 75, 70]
			})})
			this.drawChart()
		}, 2000)

	}
	drawChart = () => {
		let {chart,nowChartData} = this.state
		console.log(chart)
		console.log(nowChartData)
		chart.source(nowChartData, {month: {range: [0,1]}});
		chart.tooltip({crosshairs:{type: 'line'}});
		chart.axis('temperature',{label: {formatter: function formatter(val){return val + '℃'}}});
		chart.line().position('month*temperature').color('city');
		chart.point().position('month*temperature').color('city').size(4).shape('circle').style({
  			stroke: '#fff',
  			lineWidth: 1
		});
		chart.render();
	}
	render(){
		let {shopList, nowChartData} = this.state
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
							initialPage={0} 
							tabBarUnderlineStyle={{borderColor: '#d28a7c'}}
							tabBarActiveTextColor="#d28a7c"
							onTabClick={this.queryData}>
								<div className="chart-box realTime">
									<div id="nowChart"></div>
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

export default connect(state=>({}), {
	updateNowChartData: Actions.updateNowChartData
})(Home)