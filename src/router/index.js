// 路由配置
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/* ----------------
 * 前台
 ----------------- */
// 前台首页
import Index from '@/containers/Index.vue'
// 商品详情页
// import Detail from '@/components/Detail.vue'
// // 用户登陆页
// import Login from '@/components/login.vue'
// // ？
// import Tips from '@/components/tips.vue'
// // 个人中心首页
// import Person from '@/components/Person'
// // 个人中心信息页
// import Info from '@/components/Person/userInfo.vue'
// // 个人中心借阅记录页
// import Records from '@/components/Person/userRecords.vue'
// // 个人中心订单记录页
// import UserOrder from '@/components/Person/userOrder.vue'
// // 个人中心设置地址页
// import Address from '@/components/Person/userAddress.vue'
// // 购物车组件
// import Cart from '@/components/cart/index.vue'
// // 订单页面
// import Order from '@/components/order/index.vue'
/* ----------------
 * 后台
 ----------------- */
 // 后台首页
// import Admin from '@/components/admin/index.vue'
// // 还书页
// import Returnbooks from '@/components/admin/returnbooks.vue'
// // 书籍列表页
// import Booklist from '@/components/admin/booklist.vue'
// // 会员列表页
// import Memberlist from '@/components/admin/memberlist.vue'
// // 会员详情页
// import MemberDetail from '@/components/admin/memberDetail.vue'
// // 借阅记录页
// import Recordlist from '@/components/admin/recordlist.vue'
// // 订单记录页
// import Orderlist from '@/components/admin/orderlist.vue'
// // 管理员登陆页
// import Adminlogin from '@/components/admin/adminlogin.vue'

export default new Router({
	routes: [
		{
			// 主页
			path: '/',
			name: 'Index',
			component: Index
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
		// }, {
		// 	// 后台主页
		// 	path: 'admin',
		// 	name: 'Admin',
		// 	component: Admin
		}
	]
})
