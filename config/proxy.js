const express = require('express')
const fetch = require('isomorphic-fetch')

const app = express()

app.get('/service/:query', (req, res, next) => {
	var query = req.url.split('/')[2]
	console.log(req.url)
	console.log(query)
	fetch('http://127.0.0.1:8123/' + query)
		.then(response => {
			return response.json()
		})
		.then(response => {
			console.log(response)
			res.send(response)
		})
		.catch(err => {
			console.log(err)
		})
})

app.post('/service/:query', (req, res, next) => {
	// console.log(req.body)
	var query = req.url.split('/')[2]
	var user = {
	    username: req.body.username,
	    password: req.body.password
    }
	fetch('http://127.0.0.1:8123/' + query, {
		method: 'POST',
		body: JSON.stringify(user)
	})
	.then(response => {
		console.log(response)
		return response.json()
	})
	.then(response => {
		res.send(response)
	})
	.catch(err => {
		res.send(err)
	})
})


app.listen(3000, (err, res) => {
	if(err) {
		console.log(err)
		return
	}

	console.log('Service is listenning at port: 3000')
})