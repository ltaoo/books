import Vue from 'vue'
import { Promise } from 'es6-promise'
import {EventEmitter} from 'events'

const auth = new EventEmitter()

export default auth

auth.login = function(username, password){
	return new Promise(function(resolve, reject){
		Vue.http.get('./src/data/user.json').then(res => {
			//先读取到用户列表
			//因为用的是示例数据，这里要循环读取
			for (var i = res.length - 1; i >= 0; i--) {
				if(res[i].userName == username && res[i].userTel == password){
					//如果用户名和密码都匹配
					resolve(res[i])
				}else{
					reject(0)
				}
			}
		}).catch(err => {
			reject(err)
		})
	})
}