import React from 'react';
import {Card, Badge, Drawer, Button} from 'antd-mobile';
import MyMenu from './../../../component/Menu';
import {connect} from 'react-redux';
import Actions from './../../../redux/actions';
import DishList from './dishlist';
import history from './../../../configs/history';
import './../shop.less';

import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');
class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.el = document.createElement('div')
	}

	componentDidMount(){
		this.el.setAttribute('class', 'modal-mask')
		modalRoot.appendChild(this.el)
	}
	componentWillUnmount(){
		modalRoot.removeChild(this.el)
	}

	render(){
		return ReactDOM.createPortal(this.props.children, this.el)
	}
}

class OrderDishes extends React.Component {
	constructor() {
		super()
		this.state = {
			choicedCount: 0, //购物车选中的商品数量
			showlist: false, //购物车商品清单
			showModal: false,
		}
	}
	onChange=(val, index)=>{
		console.log('选中的菜单类是：'+val)
	}
	chooseDish=(val)=>{
		console.log('选中的菜单是：'+val)
	}
	handleAdd = (parentIndex, index, event) => {
		event.stopPropagation();
		console.log(event.target.getBoundingClientRect())
		this.props.dispatch(Actions.addDishesChoice({
			index,
			parentIndex,
		}))
		this.setState(preState =>{
			return {
				choicedCount: ++preState.choicedCount
			}
		})
	}
	handleDelete = (parentIndex, index, event) => {
		event.stopPropagation();
		this.props.dispatch(Actions.deleteDishesChoice({
			index,
			parentIndex,
		}))
		this.setState(preState =>({
			choicedCount: --preState.choicedCount
		}))
	}
	showChoosedList = () => {
		if(this.state.choicedCount > 0) {
			this.setState({
				showlist: true
			})
		}
	}
	onOpenChange = () => {
		this.setState({
			showlist: !this.state.showlist
		})
	}
	gotoPage = ()=> {
		history.push('/shop/test')
	}
	componentDidMount(){
		const initData = [
			{value: '1', label: 'Food', children:[
					{label:'我的好吃的好吃的好吃的好吃的好吃的吃的好吃的吃的好吃的吃的好吃的',value: '4',count:0},
					{label:'label12',value: '41',count:1},
					{label:'label12',value: '42',count:0},
					{label:'label11',value: '43',count:0},
					{label:'label11',value: '44',count:0},
					{label:'label11',value: '45',count:0},
					{label:'label11',value: '46',count:0},
					{label:'label11',value: '47',count:0},
					{label:'label11',value: '48',count:0},
					{label:'label11',value: '49',count:0},
					{label:'label11',value: '50',count:0},
					{label:'label11',value: '51',count:0},
					{label:'label11',value: '52',count:0},
					{label:'label11',value: '53',count:0},
					{label:'label11',value: '54',count:0},
					{label:'label11',value: '55',count:0},
					{label:'label11',value: '56',count:0},
					{label:'label11',value: '57',count:0},
				]},
			{value: '2', label: 'label1', children:[{label:'label123',value: '31',count:0}]},
			{value: '3', label: 'label2', children:[{label:'label122',value: '33',count:0}]},
		]
		let choicedCount = 0;
		initData.map(item => {
			item.children.map(child => {
				if(child.count > 0) {
					choicedCount += child.count
				}
			})
		})
		this.setState({
			choicedCount
		})
		setTimeout(() => {
			this.props.dispatch(Actions.setDishesChoice(initData))
		}, 500)
		
	}
	render(){
		const Item = (data, parentIndex, index) => (
			<Card>
				<Card.Body>
					<div className="dish-body">
						<div className="img-con">
						</div>
						<div className="content">
							<p>{data.label}</p>
							<div className="price-action">
								<span>￥38.00</span>
								<span className="action">
									{ data.count > 0 ? <i className="delete iconfont icon-minus-circle" onClick={this.handleDelete.bind(this, parentIndex, index)}></i> : ''}
									{data.count>0 ? <span className="num">{data.count}</span>: ''}
									{/* <i className="ball-mark"></i> */}
									<i className="add iconfont icon-plus-circle" onClick={this.handleAdd.bind(this, parentIndex, index)}></i>
								</span>
							</div>
						</div>
					</div>
					
				</Card.Body>
			</Card>
		)
		const initData = [...this.props.dishesData]
		// 购物车商品列表
		const sidebar = (
			<DishList handleDelete={this.handleDelete} handleAdd={this.handleAdd}></DishList>
		)

		const modal = this.state.showModal ? (
			<Modal>
				<div className="modal-container">
					<div className="modal-body">确认选好了？</div>
					<div className="modal-footer">
						<Button size="small" onClick={()=> this.setState({showModal:false})}>确定</Button>
					</div>
					
				</div>
			</Modal>
		) : null
		
		return (
			
			<div className="order-dishes">
				<Drawer 
					open={this.state.showlist} 
					position="bottom" 
					sidebar={this.state.showlist ? sidebar : ''}
					sidebarStyle={{background:'#fff',marginBottom:'50px'}}
					overlayStyle={{bottom: '50px'}}
					contentStyle={{bottom: '50px'}}
					onOpenChange={this.onOpenChange}
				>
				{/* menuData: 分类源数据，height：高度，mainActiveIndex：默认选中的分类的索引， navChange:分类改变时，itemClick: 单击分类时， menuItem:分类项渲染的模板 */}
					<MyMenu 
						menuData={initData} 
						height={document.documentElement.clientHeight - 50}
						mainActiveIndex={1}
						navChange={this.onChange}
						itemClick={this.chooseDish}
						menuItem={Item}
						></MyMenu>
				</Drawer>
				<div className="shopping-car">
					<div className="shopping-car_con" onClick={this.showChoosedList}>
						<div className="shopping-car_con_inner">
						<Badge text={this.state.choicedCount}>
							<i className="iconfont icon-gouwuche"></i>
						</Badge>
						</div>
					</div>
					<div className="shopping-car_btn">
						<p onClick={()=> this.setState({showModal: true})}>选好了 ></p>
					</div>
				</div>
				{modal}
			</div>
			
		)
	}
}

export default connect(state => ({
	dishesData: state.dishesData,
}))(OrderDishes)