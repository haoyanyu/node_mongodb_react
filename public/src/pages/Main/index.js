import {Route, Redirect} from 'react-router-dom'
import Loadable from 'react-loadable'
import React from 'react'
import history from './../../configs/history'
import {connect} from 'react-redux'
import Actions from './../../redux/actions'
import classNames from 'classnames'
// less
import './main'

const {location} = history

const Loading = () => (
	<div>
		Loading...
	</div>
)

const Index = Loadable({
	loader:() => import('./components/Home'),
	loading: Loading
})
const BoxIndex = Loadable({
	loader:() => import('./components/Box/index'),
	loading: Loading
})
const ShopIndex = Loadable({
	loader:() => import('./components/Shop/index'),
	loading: Loading
})
const MineIndex = Loadable({
	loader:() => import('./components/Mine/index'),
	loading: Loading
})

class PageHome extends React.Component {
	constructor(){
		super()
	}
	componentDidMount(){
		let pathname = location.pathname.split('/')[2]
		this.props.dispatch(Actions.updateTab(pathname))
	}
	handleUpdateTab = (name) => {
		this.props.dispatch(Actions.updateTab(name))
		history.replace(name)
	}

	render(){
		const {activedTab}  = this.props
		return (
			<div className="home-content">
				<div className="content-wrap">
					{location.pathname === '/main' ? <Redirect to="/main/index" /> : ''}
					<Route path="/main/index" component={Index}></Route>
					<Route path="/main/box" component={BoxIndex}></Route>
					<Route path="/main/shop" component={ShopIndex}></Route>
					<Route path="/main/mine" component={MineIndex}></Route>
					{/* <Route path="/main/shop" component={Index}></Route>
					<Route path="/main/mine" component={Index}></Route> */}
				</div>
				<div className="bottom-tabs">
					<div className="tabs">
						<div className={activedTab === 'index' ? 'tab active-tab': 'tab'} data-tabname="index" onClick={this.handleUpdateTab.bind(this, 'index')}>
							<i className="iconfont icon-home"></i>
							<span>首页</span>
						</div>
						<div className={classNames("tab", {'active-tab': activedTab ==='box'})} data-tabname="box" onClick={this.handleUpdateTab.bind(this, 'box')}> 
							<i className="iconfont icon-appstore"></i>
							<span>盒子</span>
						</div>
						<div className={classNames("tab", {'active-tab': activedTab ==='shop'})} data-tabname="shop" onClick={this.handleUpdateTab.bind(this, 'shop')}>
							<i className="iconfont icon-shop"></i>
							<span>店铺</span>
						</div>
						<div className={classNames("tab", {'active-tab': activedTab ==='mine'})} data-tabname="mine" onClick={this.handleUpdateTab.bind(this, 'mine')}>
							<i className="iconfont icon-user"></i>
							<span>我的</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	activedTab: state.activedTab
}))(PageHome)