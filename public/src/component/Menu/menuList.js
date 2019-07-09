import React from 'react';

export default class MenuList extends React.Component{
	
	render(){
		const menulist = this.props.data;
		const menuItem = this.props.menuItem;
		return (
			<div>
				<ul className="menu-list_category_con">
					{/* 分类中的商品 */}
					{
						menulist.map((child, i) => (
							<li 
								className="menu-list_category_item" 
								key={child.value} 
								onClick={this.props.itemClick.bind(this, child)}
								>
								{
									menuItem ? menuItem(child,this.props.parentIndex, i) : child.label
								}
							</li>
						))
					}
				</ul>
				
			</div>
		)
	}
}