import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Login from './../pages/login';

const history = createHistory();
const {location} = history;

class RouteConfig extends React.Component{
	render(){
		return (
			<Router>
				<Switch>
					<Route exact path="/login-page" component={Login}></Route>
				</Switch>
			</Router>
		)
	}
}

export default RouteConfig