import React from 'react';
import ReactDOM from 'react-dom';
import {Button, SearchBar, WhiteSpace, WingBlank, ListView} from 'antd-mobile';
import './../shop.less';
import history from './../../../configs/history';
import foodImg from './../../../images/food.png';
import {connect} from 'react-redux';
import Actions from './../../../redux/actions'

function ListBody(props) {
	return (
		<div className="my-list-body">
			{props.children}
		</div>
	)
}
let data = [
  {
	id: 1,
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
	price: '35.00',
	remark: '待取餐',
	status: 1,
  },
  {
	id: 2,
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
	price: '34.00',
	remark: '订单已完成',
	status: 2
  },
  {
	id: 3,
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
	price: '18.00',
	remark: '订单已完成',
	status: 2
  },
  {
	id: 4,
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
	price: '18.00',
	remark: '订单已完成',
	status: 2
  },
  {
	id: 5,
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
	price: '18.00',
	remark: '订单已完成',
	status: 2
  },
  {
	id: 6,
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
	price: '18.00',
	remark: '订单已完成',
	status: 2
  },
  {
	id: 7,
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
	price: '18.00',
	remark: '订单已完成',
	status: 2
  },
  {
	id: 8,
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
	price: '18.00',
	remark: '订单已完成',
	status: 2
  },
];

class ShopOrders extends React.Component {
	constructor(props) {
		super(props)
		const getRowData = (dataBlob,sessionId, rowId) => {
			return dataBlob[rowId]
		}
		const  dataSource = new ListView.DataSource({
			// getRowData,
			rowHasChanged: (row1, row2) => row1 !== row2,
     		sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
		})
		this.state = {
			value: '',
			isLoading: true,
			pageNum: 5, //页数
			orderList: dataSource, //订单列表
			height: document.documentElement.clientHeight * 3 / 4,
		}
	}
	
	onChange = (value)=> {
		this.setState({
			value
		})
	}
	onClear = () => {
		this.setState({ value: '' });
	}
	onSubmit = (value) => {
		console.log('查询订单')
	}
	onEndReached = ()=>{
		console.log(this.state.pageNum)
		if (this.state.pageNum >= 5 || this.state.isLoading) {
			return;
		}

		this.setState({
			isLoading: true
		})
		setTimeout(()=>{
			let new_data = data.map(item => {item.id = new Date().getTime()})
			data = data.concat(new_data)
			console.log(data)
			this.setState((preState)=>{
				return {
					orderList: this.preState.orderList.cloneWithRowsAndSections(data),
					isLoading: false,
					pageNum: ++this.preState.pageNum
				}
			})
		}, 600)
	}
	getInOrderDetail =(data)=>{
		this.props.dispatch(Actions.updateOrderDetail({...data}))
		history.push('/shop/order-detail')
	}
	componentDidMount(){
		this.autoFocusInst.focus();
		const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
		setTimeout(() => {
			this.setState({
				orderList: this.state.orderList.cloneWithRowsAndSections(data),
				isLoading: false,
				height: hei,
			});
		}, 600);
	}
	render(){
		let index = 0;
		const row = (rowData) => {
			if(index > data.length-1) {
				index = 0
			}
			const obj = data[index++]
			return (
				<div key={obj.id} style={{ padding: '0 15px',background:'#fff' }} onClick={this.getInOrderDetail.bind(this, obj)}>
					<div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0', color:'#383838' }}>
						<img style={{ height: '24px', marginRight: '15px' }} src={obj.img} alt=""/>
						<div style={{ lineHeight: 1,display:'flex' }}>
							<div style={{ marginBottom: '8px' }}>{obj.id}、{obj.des}</div>
							<div style={{ marginBottom: '8px', marginLeft:'10px',fontSize: 'small',color: '#767676' }}>{obj.status}</div>
						</div>
					</div>
					<div 
						style={{
							display: '-webkit-box', 
							display: 'flex',
							color: '#383838',
							borderTop: '1px solid #F6F6F6',
							lineHeight:4
						}}
					>
						<div style={{textAlign:'left',flex: 1,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}><span>{obj.title}</span></div>
						<div style={{textAlign:'center',flex: 1}}><span>{obj.price}</span></div>
					</div>
					
				</div>
			)
		}
		return (
			<div className="orders-page">
				<div className="orders-page__searchWrapper">
					<WingBlank>
						<SearchBar 
							value={this.state.value}
							placeholder="输入商品名称关键字" 
							ref={ref => this.autoFocusInst = ref} 
							onChange={this.onChange}
							onClear={this.onClear}
							onSubmit={this.onSubmit}
							/>
					</WingBlank>
				</div>
				<div>
					<ListView 
						ref={el => this.lv = el}
						dataSource={this.state.orderList}
						renderFooter={()=>(
							<div style={{padding: 30, textAlign:'center'}}>
								{this.state.isLoading ? '加载更多···' : ''}
							</div>
						)}
						renderBodyComponent={() => <ListBody/>}
						renderRow={row}
						renderSeparator={()=> <WhiteSpace/>}
						initialListSize={7}
						pageSize={7}
						scrollRenderAheadDistance={200}
						onEndReachedThreshold={10}
						onEndReached={this.onEndReached}
						style={{
							height: this.state.height,
							overflow: 'auto',
						}}
						>

					</ListView>
					
				</div>
			</div>
		)
	}
}

export default connect()(ShopOrders)