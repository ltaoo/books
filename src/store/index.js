import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	member: {},
	memberLogin: localStorage.getItem('userid'),
	carts: []
}

import { rank, computedPriceByTimes } from '@/utils/index'

// 初始化登录信息
import { searchMemberById } from '@/store/admin/member'
if (localStorage.getItem('userid')) {
	searchMemberById(localStorage.getItem('userid'))
		.then(res => {
			state.member = Object.assign(res.data, {
				memberRank: rank(res.data.memberRank)
			})
		})
}

// 初始化购物车列表
import { fetchCartList } from '@/store/cart'
if (localStorage.getItem('cartSession')) {
	fetchCartList(localStorage.getItem('cartSession'))
		.then(res => {
			// 获取到保存在数据库中的购物车列表
			state.carts = res.data.map(item => {
				const newPrice = computedPriceByTimes(item.bookPrice, item.borrowTimes)
				return Object.assign(item, {
					newPrice
				})
			})
		})
}

const mutations = {
	// 登录
	LOGIN (state, payload) {
		state.member = payload
		localStorage.setItem('userid', payload.memberId)
		state.memberLogin = payload.memberId
	},
	// 登出
	LOGOUT (state) {
		localStorage.removeItem('userid')
		state.member = null
		state.memberLogin = null
	},
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
