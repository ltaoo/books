import fetch from 'isomorphic-fetch'
import fetchJsonp from 'fetch-jsonp'

import { prefix, doubanApi } from '@/config/index'
import { url } from '@/utils/index'

const bookapi = `${prefix}/getBooks.service.php?`
// 获取所有书籍
export function fetchBooks () {
	return new Promise((resolve, reject) => {
		fetch(url(bookapi, 'getBookList'))
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
// 从豆瓣 api 查询书籍
export function searchByDouban (param) {
	return new Promise((resolve, reject) => {
		fetchJsonp(`${doubanApi}q=${param}&count=10`, {
			jsonpCallback: 'callback'
		})
			.then((response) => {
				return response.json()
			})
			.then(json => {
				resolve(json)
			})
			.catch(ex => {
				reject(ex)
			})
	})
}
