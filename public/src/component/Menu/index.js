import MenuCategory from './menucategory';
import MenuList from './menuList';
import PropTypes from 'prop-types';

import React from 'react';
import './index.less';

class MyMenu extends React.Component {
	static defaultProps =  {
		activedIndex: 0,
		mainActiveIndex: 0, //当前激活的主分类索引
		menuItem: false, //自定义渲染的分类列表项
		height: 300,
		itemClick:()=>{}
	}
	constructor(props) {
		super(props)
		this.state = {
			menuSubData:[], //子分类列表
		}
	}
	componentWillMount(){
		this.setState({
			mainActiveIndex: this.props.mainActiveIndex
		})
	}
	// val： value值， index ： 索引
	onChange = (val, index) => {
		this.setState({
			menuSubData: this.props.menuData[index].children,
			mainActiveIndex: index
		})
		this.props.navChange ? this.props.navChange(val, index) : ''
	}
	render(){
		const {
			menuData, 
			height, 
			menuItem, 
			itemClick
		} = this.props,
		{
			mainActiveIndex
		} = this.state;
		// console.log(this.props.menuData)
		// console.log(mainActiveIndex)
		let menuSubData = this.props.menuData.length > 0 ? this.props.menuData[mainActiveIndex].children : []
		return (
			<div className="my-menu" style={{height: height + 'px'}}>
				<div className="my-menu_item my-menu_category">
					<MenuCategory onChange={this.onChange} data={menuData} mainActiveIndex={mainActiveIndex}></MenuCategory>
				</div>
				<div className="my-menu_item my-menu_list">
					<MenuList data={menuSubData} menuItem={menuItem} parentIndex={mainActiveIndex} itemClick={itemClick}></MenuList>
				</div>
				
			</div>
		)
	}
}

MyMenu.propTypes = {
	menuData: PropTypes.array, //分类数据
	height: PropTypes.oneOfType([ //容器高度
		PropTypes.number,
		PropTypes.string
	]),
}

export default MyMenu