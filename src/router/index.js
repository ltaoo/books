// 路由配置
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/* ----------------
 * 前台
 ----------------- */
// 前台根视图
import Index from '@/containers/Index.vue'
// 真正首页
import IndexBooks from '@/containers/Books.vue'
// 商品详情页
// import Detail from '@/components/Detail.vue'
// 用户登陆页
import UserLogin from '@/containers/UserLogin.vue'
// ？
// import Tips from '@/components/tips.vue'
// 个人中心首页
// import Person from '@/components/Person'
// 个人中心信息页
// import Info from '@/components/Person/userInfo.vue'
// 个人中心借阅记录页
// import Records from '@/components/Person/userRecords.vue'
// 个人中心订单记录页
// import UserOrder from '@/components/Person/userOrder.vue'
// 个人中心设置地址页
// import Address from '@/components/Person/userAddress.vue'
// 购物车组件
// import Cart from '@/components/cart/index.vue'
// 订单页面
import Order from '@/containers/Order.vue'
/* ----------------
 * 后台
 ----------------- */
// 后台根视图
import Admin from '@/containers/Admin/Index.vue'
// 后台主页也就是借书页
import Borrow from '@/containers/Admin/Borrow.vue'
// 还书页
import Return from '@/containers/Admin/Return.vue'
// 书籍列表页
import Books from '@/containers/Admin/Books.vue'
// 会员列表页
import Members from '@/containers/Admin/Members.vue'
// 会员详情页
import MemberDetail from '@/containers/Admin/MemberDetail.vue'
// 借阅记录页
import Records from '@/containers/Admin/Records.vue'
// 订单记录页
import Orders from '@/containers/Admin/Orders.vue'
// 管理员登陆页
import AdminLogin from '@/containers/Admin/AdminLogin.vue'

const router = new Router({
	routes: [
		{
			// 主页
			path: '/',
			name: 'Index',
			component: Index,
			children: [
				{
					path: 'books',
					name: 'IndexBooks',
					component: IndexBooks
				}, {
					// 订单结算页
					path: 'order',
					name: 'OrderCount',
					component: Order,
					meta: { requiresAuth: true }
				}
			]
		// }, {
		// 	// 商品详情页
		// 	path: '/goods/:id',
		// 	name: 'Detail',
		// 	component: Detail
		// }, {
		// 	// 用户主页
		// 	path: '/person',
		// 	name: 'Person',
		// 	component: Person,
		// 	children: [
		// 		{
		// 			path: '/info',
		// 			component: Info
		// 		}
		// 	]
		}, {
			path: '/userlogin',
			name: 'UserLogin',
			component: UserLogin
		}, {
			// 后台根视图
			path: '/admin',
			name: 'Admin',
			component: Admin,
			meta: { adminAuth: true },
			children: [
				{
					// 借书页
					path: 'borrow',
					name: 'Borrow',
					component: Borrow,
					meta: { adminAuth: true }
				}, {
					// 还书页
					path: 'return',
					name: 'Return',
					component: Return,
					meta: { adminAuth: true }
				}, {
					// 会员列表页
					path: 'members',
					name: 'Members',
					component: Members,
					meta: { adminAuth: true }
				}, {
					// 书籍列表页
					path: 'books',
					name: 'Books',
					component: Books,
					meta: { adminAuth: true }
				}, {
					// 借阅记录列表页
					path: 'records',
					name: 'Records',
					component: Records,
					meta: { adminAuth: true }
				}, {
					// 订单列表页
					path: 'orders',
					name: 'Orders',
					component: Orders,
					meta: { adminAuth: true }
				}, {
					// 会员修改页
					path: 'member/:id',
					name: 'MemberDetail',
					component: MemberDetail,
					meta: { adminAuth: true }
				}
			]
		}, {
			// 管理员登录
			path: '/adminlogin',
			name: 'AdminLogin',
			component: AdminLogin
		}
	]
})

// 认证钩子
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// 用户登录验证
		if (localStorage.getItem('userId')) {
			next()
		} else {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		}
	} else if (to.matched.some(record => record.meta.adminAuth)) {
		if (localStorage.getItem('adminLogin')) {
			next()
		} else {
			next({
				path: '/adminlogin',
				query: {
					redirect: to.fullPath
				}
			})
		}
	} else {
		next()
	}
})

export default router
