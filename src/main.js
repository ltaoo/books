import Vue from 'vue'
import Resource from 'vue-resource'
import Router from 'vue-router'

import routerMap from'./routerMap.js'
//引入过滤器
import {rank, sumDaysByRank, sumCanBorrow, sumRank } from './filters/admin.js';
import {fetchNotSale, sumPriceByBorrowTimes, orderState, hiddenName } from './filters/index.js';

import App from './components/App.vue';
//用户验证
import userAuthentication from './store/authentication.js'

Vue.use(Router)
Vue.use(Resource)
Vue.filter('rank', rank)
Vue.filter('sumDaysByRank', sumDaysByRank)
Vue.filter('sumCanBorrow', sumCanBorrow)
Vue.filter('sumRank', sumRank);
Vue.filter('fetchNotSale', fetchNotSale);
Vue.filter('sumPriceByBorrowTimes', sumPriceByBorrowTimes);
Vue.filter('orderState', orderState);
Vue.filter('hiddenName', hiddenName);

var router = new Router()

router.redirect({
	//应该要有404页面会更友好。
	'*': '/index'
})
//前置钩子
//利用前置钩子在页面切换时对用户权限进行判断。
router.beforeEach(function(transition){
	if(transition.to.auth){
		//用户登录验证
		if(localStorage.userid){
			transition.next()
		}else{
			//先记录当前url，作为参数传递给login页面，login成功后可以返回登录前页面。
			let redirect = encodeURIComponent(transition.to.path)
			//跳转页面
			transition.redirect('/login?redirect=' + redirect)
		}
	}else if(transition.to.adminAuth){
		//后台验证
		console.log('后台')
		transition.next()
	}else{
		transition.next()
	}
})
//加载配置路由
routerMap(router)
//开始
router.start(App, '#app')