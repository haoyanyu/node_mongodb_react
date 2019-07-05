import React from 'react';
import './index.less';

export default class MenuCategory extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			curValue: '', //当前选中的类
		}
		this.handleClick = this.handleClick.bind(this)
	}
	componentDidMount(){
		this.setState((prevState, prevProps)=>{
			return {
				curValue: prevProps.data[0].value
			}
		})
	}
	handleClick(val, index){
		this.setState({
			curValue: val
		},function(){
			this.props.onChange(val, index)
		})

	}
	render(){
		const categorys = this.props.data;
		const value = this.state.curValue;

		return (
			<ul className="menu-item__con">
			
				{
					categorys.map((item, index) => (
						<li onClick={this.handleClick.bind(this, item.value, index)} id={'category_'+item.value} className={value == item.value ? 'is-actived' : ''} key={item.value}>{item.label}</li>
					))
				}
			</ul>
		)
	}
}