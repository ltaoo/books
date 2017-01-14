var fetch = require('isomorphic-fetch')
var FormData = require('form-data');

// 测试登陆
var login  = new FormData();
var data = {
	username: 'ltaoo',
	password: '123456'
}

for(let name in data) {
	login.append(name, data[name]);
}
fetch('http://127.0.0.1:8123/login.php', {
	method: 'POST',
	body: login
})
.then(response => {
	if(response.status === 200) {
		return response.json()
	} else {
		return Promise.reject(response.statusText)
	}
})
.then(response => {
	console.log(response)
})
.catch(err => {
	console.log(err)
})

// var newbook = new FormData();
// var data = {
// 	title: '小王子',
// 	'isbn13': '9787020042494',
// 	price: 22,
// 	summary: '23123',
// 	image: 'https://img1.doubanio.com/mpic/s1237549.jpg'
// }
// for(let name in data) {
// 	newbook.append(name, data[name]);
// }
// fetch('http://127.0.0.1:8123/addBook.service.php', {
// 	method: 'POST',
// 	body: newbook
// })
// .then(response => {
// 	if(response.status === 200) {
// 		return response.json()
// 	} else {
// 		return Promise.reject(response.statusText)
// 	}
// })
// .then(response => {
// 	console.log(response)
// })
// .catch(err => {
// 	console.log(err)
// })