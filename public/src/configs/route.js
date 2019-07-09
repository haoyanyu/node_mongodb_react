import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Login from './../pages/login';
import PageHome from './../pages/Main';
// import AddShop from './../pages/shop/addShop';
// import BoxList from './../pages/box/boxList';
// import BoxDetail from './../pages/box/boxInfo';
// import ShopIndex from './../pages/shop/shopList'; //店铺列表
// import ShopOrders from './../pages/shop/shopOrders'; //订单列表
// import ShopOrderDetail from './../pages/shop/shopOrderDetail'; //订单详情
// const OrderDishes = Loadable({
// 	loader:() => import('./../pages/shop/orderDishes'),
// 	loading: Loading
// })
import Test from './../pages/shop/test'; 

import {routeComponets} from './route.config';
// console.log(routeComponets)

const history = createHistory();
const {location} = history;

class RouteConfig extends React.Component{
	render(){
		return (
			<Router>
				<Switch>
					{/* <Route exact path="/" component={Login}></Route> */}
					<Redirect exact from='/' to='/main' />
					<Route path="/main" component={PageHome}></Route>
					{
						routeComponets.map(router => (
							<Route key={router.name} exact path={router.path} component={router.component}></Route>
						))
					}
					 
					{/* <Route exact path="" component={BoxList}></Route> 
					<Route exact path="" component={BoxDetail}></Route> 
					<Route exact path="" component={ShopIndex}></Route> 
					<Route exact path="" component={ShopOrders}></Route> 
					<Route exact path="" component={ShopOrderDetail}></Route>  */}
					{/* <Route exact path="" component={OrderDishes}></Route>  */}
					<Route exact path="/shop/test" component={Test}></Route> 
				</Switch>
			</Router>
		)
	}
}

export default RouteConfig