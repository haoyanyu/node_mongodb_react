import React from 'react';
import {connect} from 'react-redux';

class DishList extends React.Component {
	constructor(props) {
		super(props)
	}
	render(){
		const {handleDelete, handleAdd, dishesData} = this.props
		let choosedDish = [];
		dishesData.map((item, index) => {
			item.children.map((child, i) => {
				if(child.count > 0) {
					let o = {
						...child,
						parentIndex: index, 
						index: i
					}
					choosedDish.push(o)
				}
			})
		})
		return (
			<div className="dish-body" style={{paddingBottom:'20px',display:'block',maxHeight:'50vh',overflow:'scroll'}}>
			<div className="list-title"><span>已选商品</span><span style={{float: 'right'}}>清空</span></div>
			{
				choosedDish.length 
				?
				choosedDish.map(data => (
					<div className="list-action" key={data.value}>
						<p className="title">{data.label}</p>
						<span className="action">
							<span>￥38.00 </span>
							{ data.count > 0 ? <i className="delete iconfont icon-minus-circle" onClick={handleDelete.bind(this, data.parentIndex, data.index)}></i> : ''}
							{data.count>0 ? <span className="num">{data.count}</span>: ''}
							<i className="add iconfont icon-plus-circle" onClick={handleAdd.bind(this, data.parentIndex, data.index)}></i>
						</span>
					</div>
				))
				:
				''
			}
			
			</div>
		)
	}
}

export default connect(state => ({
	dishesData: state.dishesData
}))(DishList)