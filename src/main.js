// 整个系统的入口
import Vue from 'vue'
// 加载 element ui 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

// Vuex 的 store
import store from './store'

// 开始
import App from '@/App.vue'
import router from '@/router'
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
