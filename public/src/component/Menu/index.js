import MenuCategory from './menucategory';
import MenuList from './menuList';
import PropTypes from 'prop-types';

import React from 'react';
import './index.less';

class MyMenu extends React.Component {
	static defaultProps =  {

	}
	constructor(props) {
		super(props)
		this.state = {
			menuSubData:[],
			parentIndex: 0,
		}
	}
	onChange = (val, index) => {
		// document.getElementById(val).scrollIntoView({behavior: 'smooth'});
		this.setState({
			menuSubData: this.props.menuData[index].children,
			parentIndex: index,
		})
		this.props.onChange ? this.props.onChange(val) : ''
	}
	render(){
		const {menuData, height, value, menuItem} = this.props
		// console.log(menuData)
		let menuSubData = this.props.menuData.length>0 ? this.props.menuData[this.state.parentIndex].children : []
		return (
			<div className="my-menu" style={{height: height + 'px'}}>
				<div className="my-menu_item my-menu_category">
					<MenuCategory onChange={this.onChange} data={menuData} value={value}></MenuCategory>
				</div>
				<div className="my-menu_item my-menu_list">
					<MenuList data={menuSubData} menuItem={menuItem} parentIndex={this.state.parentIndex}></MenuList>
				</div>
				
			</div>
		)
	}
}

MyMenu.propTypes = {
	menuData: PropTypes.array,
	height: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
}

export default MyMenu