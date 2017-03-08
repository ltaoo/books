import fetch from 'isomorphic-fetch'
// url 用来返回地址，省得拼接字符串
import { prefix, url } from '@/config'
/* --------------
 * 会员信息接口
 --------------- */
const memberapi = `${prefix}/getMembers.service.php?`
// 根据用户Id获取信息
export function searchMemberById (param) {
	return new Promise((resolve, reject) => {
		fetch(url(memberapi, 'searchById', 'memberId', param))
			.then(res => {
				resolve(res.data)
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
