import Loadable from 'react-loadable'
import React from 'react';

const Loading = () => (
	<div>
		Loadingggg...
	</div>
)

const routes = [
	
	{
		name: 'add_shop',
		staticSrc: './../pages/shop/addShop',
		path: '/add-shop',
		loader: ()=> import('./../pages/shop/addShop'),
	},
	{
		name: 'box_list',
		staticSrc: './../pages/box/boxList',
		path: '/box-list/:name',
		loader: ()=> import('./../pages/box/boxList'),
	},
	{
		name: 'box_detail',
		staticSrc: './../pages/box/boxInfo',
		path: '/box-detail/:id',
		loader: ()=> import('./../pages/box/boxInfo'),
	},
	{
		name: 'shop_index',
		staticSrc: './../pages/shop/shopList',
		path: '/shop/index',
		loader: ()=> import('./../pages/shop/shopList'),
	},
	{
		name: 'shop_orders',
		staticSrc: './../pages/shop/shopOrders',
		path: '/shop/order-list',
		loader: ()=> import('./../pages/shop/shopOrders'),
	},
	{
		name: 'shop_order_detail',
		staticSrc: './../pages/shop/shopOrderDetail',
		path: '/shop/order-detail',
		loader: ()=> import('./../pages/shop/shopOrderDetail')
	},
	{
		name: 'order_dishes',
		staticSrc: './../pages/shop/orderDishes',
		path: '/shop/order-dishes',
		loader: ()=> import('./../pages/shop/orderDishes'),
	},
]

export const routeComponets = routes.map(item => (
	{
		...item,
		component : Loadable({
			loader: item.loader,
			loading: Loading
		})
	}
))