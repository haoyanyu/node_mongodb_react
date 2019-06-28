import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Login from './../pages/login';
import PageHome from './../pages/Main';
import AddShop from './../pages/shop/addShop';
import BoxList from './../pages/box/boxList';
import BoxDetail from './../pages/box/boxInfo';
import ShopIndex from './../pages/shop/shopList'; //店铺列表
import ShopOrders from './../pages/shop/shopOrders'; //订单列表
import ShopOrderDetail from './../pages/shop/shopOrderDetail'; //订单详情
import OrderDishes from './../pages/shop/orderDishes'; //店铺点餐

const history = createHistory();
const {location} = history;

class RouteConfig extends React.Component{
	render(){
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Login}></Route>
					<Route path="/main" component={PageHome}></Route>
					<Route exact path="/add-shop" component={AddShop}></Route> 
					<Route exact path="/box-list/:name" component={BoxList}></Route> 
					<Route exact path="/box-detail/:id" component={BoxDetail}></Route> 
					<Route exact path="/shop/index" component={ShopIndex}></Route> 
					<Route exact path="/shop/order-list" component={ShopOrders}></Route> 
					<Route exact path="/shop/order-detail" component={ShopOrderDetail}></Route> 
					<Route exact path="/shop/order-dishes" component={OrderDishes}></Route> 
				</Switch>
			</Router>
		)
	}
}

export default RouteConfig