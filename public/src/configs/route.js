import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Login from './../pages/login';
import PageHome from './../pages/Main';
import AddShop from './../pages/shop/addShop';
import BoxList from './../pages/box/boxList'
import BoxDetail from './../pages/box/boxInfo'

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
				</Switch>
			</Router>
		)
	}
}

export default RouteConfig