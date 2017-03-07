// 整个系统的入口
import Vue from 'vue'
// 身份验证
// import userAuthentication from './store/authentication.js'

/* Vue.filter('rank', rank) */
// Vue.filter('sumDaysByRank', sumDaysByRank)
// Vue.filter('sumCanBorrow', sumCanBorrow)
// Vue.filter('sumRank', sumRank);
// Vue.filter('fetchNotSale', fetchNotSale);
// Vue.filter('sumPriceByBorrowTimes', sumPriceByBorrowTimes);
// Vue.filter('orderState', orderState);
// Vue.filter('hiddenName', hiddenName);
// Vue.filter('searchBy', searchBy);
// Vue.filter('returnFilter', returnFilter);
/* Vue.filter('bookState', bookState); */

// const router = new Router()
// router.redirect({
// 	//应该要有404页面会更友好。
// 	'*': '/index'
// })
// //前置钩子
// //利用前置钩子在页面切换时对用户权限进行判断。
// router.beforeEach(function(transition){
// 	if(transition.to.auth){
// 		//用户登录验证
// 		if(localStorage.userid){
// 			transition.next()
// 		}else{
// 			//先记录当前url，作为参数传递给login页面，login成功后可以返回登录前页面。
// 			const redirect = encodeURIComponent(transition.to.path)
// 			//跳转页面
// 			transition.redirect('/login?redirect=' + redirect)
// 		}
// 	}else if(transition.to.adminAuth){
// 		// 如果是访问需要登陆的后台页面
// 		if(localStorage.getItem('admin')) {
// 			transition.next()
// 		}else{
// 			const adminredirect = encodeURIComponent(transition.to.path)
// 			//跳转页面
// 			console.log(adminredirect);
// 			transition.redirect('/adminLogin?redirect=' + adminredirect)
// 		}
// 	}else{
// 		transition.next()
// 	}
// })
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

// 开始
import App from '@/App.vue'
import router from '@/router'
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
