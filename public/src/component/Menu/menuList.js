import React from 'react';

export default class MenuList extends React.Component{
	static defaultProps = {
		menuItem: false , //是否有自定义的每一项的显示组件
		parentIndex: 0,
	}
	render(){
		const menulist = this.props.data;
		const menuItem = this.props.menuItem;
		return (
			<div>
				{	
					menuItem ?
					<ul className="menu-list_category_con">
							{/* 分类中的商品 */}
							{
								
								menulist.map((child, i) => <li className="menu-list_category_item" key={child.value}>{menuItem(child,this.props.parentIndex, i)}</li>)
							}
						</ul>
					:
					<ul className="menu-list_category_con">
							{/* 分类中的商品 */}
							{
								menulist.map(child => (
									<li className="menu-list_category_item" key={child.value}>{child.label}</li>
								))
							}
						</ul>
				}
				
			</div>
		)
	}
}