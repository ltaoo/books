import fetch from 'isomorphic-fetch'

import { prefix } from '@/config/index'
import { url, convert } from '@/utils/index'

const api = `${prefix}/order.php?`
// 获取所有订单
export function fetchOrders () {
	return new Promise((resolve, reject) => {
		fetch(url(api, 'fetchList'))
			.then(res => {
				return res.json()
			})
			.then(json => {
				resolve(json)
			})
			.catch(err => {
				reject(err)
			})
	})
}
// 生成订单
export function createOrder (post) {
	return new Promise((resolve, reject) => {
		fetch(`${prefix}/order.php?action=createOrder`, {
			method: 'POST',
			body: convert(post)
		})
			.then(res => {
				return res.json()
			})
			.then(json => {
				resolve(json)
			})
			.catch(err => {
				reject(err)
			})
	})
}

// 确认订单
export function confirmOrder (orderId) {
	return new Promise((resolve, reject) => {
		fetch(url(api, 'confirmOrder', 'orderId', orderId))
			.then(res => {
				return res.json()
			})
			.then(json => {
				resolve(json)
			})
			.catch(err => {
				reject(err)
			})
	})
}
// 取消订单
export function cancelOrder (orderId) {
	return new Promise((resolve, reject) => {
		fetch(url(api, 'cancelOrder', 'orderId', orderId))
			.then(res => {
				return res.json()
			})
			.then(json => {
				resolve(json)
			})
			.catch(err => {
				reject(err)
			})
	})
}

// 根据会员id查询订单列表
export function fetchOrdersByMemberId (memberId) {
	return new Promise((resolve, reject) => {
		fetch(`${prefix}/order.php?action=list&memberId=` + memberId)
			.then(res => {
				return res.json()
			})
			.then(json => {
				resolve(json)
			})
			.catch(err => {
				reject(err)
			})
	})
}

