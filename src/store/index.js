import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	carts: []
}

const mutations = {
	// 初始化购物车
	INIT_CART (state, payload) {
		state.carts = payload
	},
	// 添加到购物车
	ADD_TO_CART (state, payload) {
		state.carts.push(payload)
	}
}

const getters = {
	// 循环计算购物车内商品总价
	count (state) {
		let sum = 0
		const carts = state.carts
		for (let i = 0, len = carts.length; i < len; i++) {
			// 获取购买数量
			let price = carts[i].newPrice
			sum += parseFloat(price)
		}
		return sum
	}
}

export default new Vuex.Store({
	state,
	mutations,
	getters
})
