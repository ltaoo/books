let fetch = require('isomorphic-fetch')
fetch("http://202.96.191.131/Wap/img.json")
    .then(data => {
        return data.json()
    })
    .then(res => {
        console.log(res)
    })
    .catch(err =>{
        console.log(err)
    })