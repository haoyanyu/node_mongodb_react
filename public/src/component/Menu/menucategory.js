import React from 'react';
import './index.less';
import PropTypes from 'prop-types';

export default class MenuCategory extends React.Component{
	// static defaultProps =  {
	// 	mainActiveIndex: 0, //当前激活的主分类索引
	// }
	constructor(props){
		super(props)
		this.state = {
			curIndex: '', //当前选中的index
		}
		this.handleClick = this.handleClick.bind(this)
	}
	componentDidMount(){
		this.setState((prevState, prevProps)=>{
			return {
				curIndex: prevProps.mainActiveIndex
			}
		})
	}
	handleClick(val, index){
		this.setState({
			curIndex: index
		},function(){
			this.props.onChange(val, index)
		})

	}
	render(){
		const categorys = this.props.data, curIndex = this.state.curIndex

		return (
			<ul className="menu-item__con">
			
				{
					categorys.map((item, index) => (
						<li onClick={this.handleClick.bind(this, item.value, index)} id={'category_'+item.value} className={curIndex == index ? 'is-actived' : ''} key={item.value}>{item.label}</li>
					))
				}
			</ul>
		)
	}
}