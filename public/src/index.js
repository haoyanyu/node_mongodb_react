import React from 'react';
import ReactDOM from 'react-dom';
import Route from './configs/route.js'
import 'antd/dist/antd.css';
import './style/base.css';
import './style/index.less';
import './../static/font/iconfont.css';

var FastClick = require('fastclick');
FastClick.attach(document.body);

ReactDOM.render(<Route></Route>, document.getElementById('root'))