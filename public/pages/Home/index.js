import React, {Component} from 'react';
import {Icon} from 'antd';
// import ProductList from './../Product/Product';
import {Link, Route} from 'react-router-dom';
// import './Home.less'
import axios from 'axios';

const API = axios.create({
	baseURL: 'http://127.0.0.1:3001/',
	headers: {"Content-Type": "multipart/form-data"}
})

class BasicInfo extends Component {
	
	render(){

		return(
			<div>
				<div className="form-group">
					<label>销售金额：</label>
					<input type="text" name="saleAmount" placeholder="请输入订单金额" onChange={this.props.handleInput}/>
				</div>
				<div className="form-group">
					<label>客户姓名：</label>
					<input type="text" name="customerName" placeholder="请输入客户姓名" onChange={this.props.handleInput}/>
				</div>
				<div className="form-group">
					<label>客户电话：</label>
					<input type="text" name="customerPhone" placeholder="请输入客户电话" onChange={this.props.handleInput}/>
				</div>
			</div>
		)
	}
}

function Products(match) {
		return (
			<div style={{textAlign: 'center'}}>
				<Link to="/home/products">
					<span className="choose-product-btn">选择产品</span>
				</Link>
				
			</div>
		)
}

class TicketsPic extends Component {
	constructor(){
		super()

		this.convertImg = this.convertImg.bind(this)
	}
	convertImg(e){
		// let file = e.target.files[0],
		// 	reader = new FileReader();
		let	that = this

    // reader.readAsDataURL(file)
		// reader.onload = function(){
		// 	if(this.result) {
		// 		that.props.uploadImg(this.result)
		// 	}
		// }
		let file = e.target.files[0];
		let formData = new FormData();
		formData.append('file', file);
		API.post('api/business/upload',formData).then( res => {
			console.log(res)
			if(res.data.code === '0') {
				that.props.uploadImg(res.data.path)
			} else {
				alert('失败')
			}
		})
	}
	render(){
		return(
			<div>
				<div className="upload-pic-btn">
					<p>上传图片</p>
					<input type="file" onChange={this.convertImg}/>
				</div>
				{this.props.children}
			</div>
			
		)
	}
}

class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			saleAmount: '',
			customerName: '',
			customerPhone:'',
			imgSrc: ''
		}
		this.handleInput = this.handleInput.bind(this)
		this.saveImg = this.saveImg.bind(this)
	}
	handleInput(e){
		let value = e.target.value,
			name = e.target.name
		this.setState({
			[name]: value
		})
	}
	saveImg(url) {

		this.setState({imgSrc: url})
	}
	
	render(){
		return (
			<div>
				<div className="home-page">
					<h5>请录入您的信息</h5>
					<div className="home-page-item basic-info">
						<BasicInfo handleInput={this.handleInput}/>
					</div>
					
					<h5>请选择销售的产品</h5>
					<div className="home-page-item">
						<Products/>
					</div>
					
					<h5>请上传发票凭证</h5>
					<div className="home-page-item">
						<TicketsPic uploadImg={this.saveImg}></TicketsPic>
					</div>
					{
						this.state.imgSrc ? <img className="picture" src={this.state.imgSrc} alt=""/> : null
					}
					<form action="http://127.0.0.1:3001/api/business/upload" method="POST" encType="multipart/form-data">
						<p><input type="file" name="uploadImg" />></p>
						<p><input type="submit" value="提交" /></p>
					</form>
				</div>
				{/* <Route path="/home/products" component={ProductList}></Route> */}
				
			</div>
		)
	}
}


export default Home