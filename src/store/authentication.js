import Vue from 'vue'
import { Promise } from 'es6-promise'
import {EventEmitter} from 'events'

const auth = new EventEmitter()

export default auth

auth.login = function(post){
	return new Promise(function(resolve, reject){
		Vue.http.options.emulateJSON = true;
		Vue.http.post('/service/memberLogin.php', post).then(res => {
			//先读取到用户列表
			//因为用的是示例数据，这里要循环读取
			resolve(res.data);
		}).catch(err => {
			reject(err);
		})
	})
}
auth.adminlogin = function(post){
	return new Promise(function(resolve, reject){
		Vue.http.options.emulateJSON = true;
		Vue.http.post('/service/login.php', post).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err);
		})
	})
}