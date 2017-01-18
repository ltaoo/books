/* ----------------
 * 前台
 -----------------*/
// 前台首页
import index from './components/index.vue'
// 商品详情页
import goodsdetail from './components/goodsDetail.vue'
// 用户登陆页
import login from './components/login.vue'
// ？
import tips from './components/tips.vue'
// 个人中心首页
import user from './components/user/index.vue'
// 个人中心信息页
import info from './components/user/userInfo.vue'
// 个人中心借阅记录页
import records from './components/user/userRecords.vue'
// 个人中心订单记录页
import userOrder from './components/user/userOrder.vue'
// 个人中心设置地址页
import address from './components/user/userAddress.vue'
// 购物车组件
import cart from './components/cart/index.vue'
// 订单页面
import order from './components/order/index.vue'
/* ----------------
 * 后台
 -----------------*/
 // 后台首页
import admin from './components/admin/index.vue'
// 还书页
import returnbooks from './components/admin/returnbooks.vue'
// 书籍列表页
import booklist from './components/admin/booklist.vue'
// 会员列表页
import memberlist from './components/admin/memberlist.vue'
// 会员详情页
import memberDetail from './components/admin/memberDetail.vue'
// 借阅记录页
import recordlist from './components/admin/recordlist.vue'
// 订单记录页
import orderlist from './components/admin/orderlist.vue'
// 管理员登陆页
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