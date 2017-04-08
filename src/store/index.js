import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	carts: []
}

const mutations = {
	ADD_TO_CART (state, payload) {
		state.carts.push(payload)
	}
}

export default new Vuex.Store({
	state,
	mutations
})
