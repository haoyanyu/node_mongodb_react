import React from 'react';
import ReactDOM from 'react-dom';
import Route from './configs/route.js';

import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducers from './redux/reducers'

import './style/base.css';
import './style/index.less';
import './../static/font/iconfont.css';

var FastClick = require('fastclick');
FastClick.attach(document.body);

const store = createStore(rootReducers, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
		<Route></Route>
	</Provider>
	, 
	document.getElementById('root')
);