import index from './components/index.vue'
import goodsdetail from './components/goodsDetail.vue'
import login from './components/login.vue'
import tips from './components/tips.vue';

import user from './components/user/index.vue'
import info from './components/user/userInfo.vue';
import records from './components/user/userRecords.vue';
import userOrder from './components/user/userOrder.vue';
import address from './components/user/userAddress.vue';

import cart from './components/cart/index.vue'
import order from './components/order/index.vue'
//后台页面
import admin from './components/admin/index.vue'
import returnbooks from './components/admin/returnbooks.vue'
import booklist from './components/admin/booklist.vue'
import memberlist from './components/admin/memberlist.vue'
import memberDetail from './components/admin/memberDetail.vue'
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
			auth: true,
			subRoutes: {
	      '/info': {
	        // 当匹配到/foo/bar时，会在Foo's <router-view>内渲染
	        // 一个Bar组件
	        component: info
	      },
	      '/records': {
	        // Baz也是一样，不同之处是匹配的路由会是/foo/baz
	        component: records
	      },
      	'/order': {
      		component: userOrder
      	},
	      '/address': {
	      	component: address
	      }
	    }
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
		//下单成功提示页
		'/success': {
			name: 'orderSuccess',
			component: tips
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
		'/memberList': {
			name: 'memberlist',
			component: memberlist,
			adminAuth: true
		},
		//后台用户信息修改页
		'/member/:memberId': {
			name: 'memberdetail',
			component: memberDetail
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
			component: adminlogin
		}
	})
}