import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Login from './../pages/login';
import Home from './../pages/Home';

const history = createHistory();
const {location} = history;

class RouteConfig extends React.Component{
	render(){
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Login}></Route>
					<Route exact path="/home" component={Home}></Route>
				</Switch>
			</Router>
		)
	}
}

export default RouteConfig