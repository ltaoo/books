import fetch from 'isomorphic-fetch'
// url 用来返回地址，省得拼接字符串
import { prefix } from '@/config'
import { url } from '@/utils'
/* --------------
 * 会员信息接口
 --------------- */
const memberapi = `${prefix}/getMembers.service.php?`
// 获取所有用户
export function fetchMembers () {
	return new Promise((resolve, reject) => {
		fetch(url(memberapi, 'getMemberList'))
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
// 根据用户Id获取信息
export function searchMemberById (param) {
	return new Promise((resolve, reject) => {
		fetch(url(memberapi, 'searchById', 'memberId', param))
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
// 根据会员学号查询会员
export function searchMemberByNum (param) {
	return new Promise((resolve, reject) => {
		fetch(url(memberapi, 'searchByNum', 'memberNum', param))
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
// 根据会员姓名查询
export function searchMemberByName (param) {
	return new Promise((resolve, reject) => {
		fetch(url(memberapi, 'searchByName', 'memberName', param))
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
// 添加会员到数据库
export function createMember (member) {
	// const FormData = require('form-data')
	let formData = new FormData()
	for (let key in member) {
		formData.append(key, member[key])
	}
	return new Promise((resolve, reject) => {
		fetch(`${prefix}/addMember.service.php`, {
			method: 'POST',
			body: formData
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
