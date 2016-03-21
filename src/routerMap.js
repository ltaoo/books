import index from './components/index.vue'
import goodsdetail from './components/goodsDetail.vue'
import login from './components/login.vue'

import user from './components/user/index.vue'
import cart from './components/cart/index.vue'
import order from './components/order/index.vue'
//后台页面
import admin from './components/admin/index.vue'
import returnbooks from './components/admin/returnbooks.vue'
import booklist from './components/admin/booklist.vue'
import userlist from './components/admin/userlist.vue'
import recordlist from './components/admin/recordlist.vue'
import orderlist from './components/admin/orderlist.vue'
import adminlogin from './components/admin/adminlogin.vue'


export default function(router) {
	router.map({
		//主页
		'/index': {
			name: 'index',
			component: index
		},
		//商品详情页
		'/goods/:bookId': {
			name: 'detail',
			component: goodsdetail
		},
		//用户主页
		'/user' :{
			name: 'user',
			component: user,
			auth: true
		},
		//购物车页面
		'/cart': {
			name: 'cart',
			component: cart
		},
		//订单结算页面
		'/order': {
			name: 'order',
			component: order
		},
		//用户登录页
		'/login': {
			name: 'login',
			component: login
		},
		//后台主页
		'/admin': {
			name: 'admin',
			component: admin,
			adminAuth: true
		},
		//后台还书页
		'/return': {
			name: 'return',
			component: returnbooks,
			adminAuth: true
		},
		//后台书籍列表页
		'/bookList': {
			name: 'booklist',
			component: booklist,
			adminAuth: true
		},
		//后台用户列表页
		'/userList': {
			name: 'userlist',
			component: userlist,
			adminAuth: true
		},
		//后台记录列表页
		'/recordList': {
			name: 'recordlist',
			component: recordlist,
			adminAuth: true
		},
		//后台订单列表页
		'/orderList': {
			name: 'orderlist',
			component: orderlist,
			adminAuth: true
		},
		//后台登录页
		'/adminLogin': {
			name: 'adminlogin',
			component: adminlogin,
			adminAuth: true
		}
	})
}