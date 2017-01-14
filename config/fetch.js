var fetch = require('isomorphic-fetch')
var FormData = require('form-data');

var formData  = new FormData();
var data = {
	username: 'ltaoo',
	password: '123456'
}

for(let name in data) {
	formData.append(name, data[name]);
}

fetch('http://127.0.0.1:8123/login.php', {
	method: 'POST',
	body: formData
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