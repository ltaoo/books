import Vue from 'vue'
import { EventEmitter } from 'events'

const bookStore = new EventEmitter()

// 根据id获取书籍
bookStore.fetchItem = id => {
	return new Promise((resolve, reject) => {
		Vue.http.get('./service/getBooks.service.php?action=searchById&bookId=' + id)
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}
// 获取全部书籍记录
bookStore.fetchItems = () => {
	return new Promise((resolve, reject) => {
		Vue.http.get('/service/getBooks.service.php?action=getBookList')
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}
// 查询书籍是否被借阅
bookStore.isBorrow = id => {
	return new Promise((resolve, reject) => {
		Vue.http.get('./service/getRecords.service.php?action=searchByBookId&bookId=' + id)
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	})
}
// 获取购物车列表
bookStore.cartlist = session => {
	return new Promise((resolve, reject) => {
		Vue.http.get('./service/cart.php?action=list&cartSession=' + session)
		.then(res => {
			if (res.data.msg === 'empty') {
				reject('empty')
			} else {
				resolve(res.data)
			}
		})
		.catch(err => {
			reject(err)
		})
	})
}
// 加入购物车
bookStore.addCart = obj => {
	return new Promise((resolve, reject) => {
		Vue.http.options.emulateJSON = true
		Vue.http.post('./service/cart.php?action=addCart', obj)
		.then(res => {
			if (res.data.state === 'success') {
				// 如果添加成功
				resolve(res.data)
			} else {
				reject(res.data)
			}
		})
		.catch(err => {
			reject(err)
		})
	})
}
// 从购物车中移除指定商品，还要确定是移除了该用户的，所以还要传入cartSession
bookStore.delete = obj => {
	return new Promise((resolve, reject) => {
		Vue.http.options.emulateJSON = true
		Vue.http.get(`./service/cart.php?action=delete&cartSession=${obj.cartSession}&bookId=${obj.bookId}`)
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}
// 生成订单
bookStore.createOrder = post => {
	return new Promise((resolve, reject) => {
		Vue.http.options.emulateJSON = true
		Vue.http.post('./service/order.php?action=createOrder', post)
			.then(res => {
				if (res.data.state === 'success') {
					// 如果添加成功
					resolve(res.data)
				} else {
					reject(res)
				}
			})
			.catch(err => {
				reject(err)
			})
	})
}
// 清空购物车
bookStore.emptyCart = cartSession => {
	return new Promise((resolve, reject) => {
		Vue.http.get('./service/cart.php?action=emptyCart&cartSession=' + cartSession)
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}
// 根据会员id查询订单列表
bookStore.fetchOrderList = memberId => {
	return new Promise((resolve, reject) => {
		Vue.http.get('./service/order.php?action=list&memberId=' + memberId)
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}
// 添加评论
bookStore.addComment = post => {
	return new Promise((resolve, reject) => {
		Vue.http.options.emulateJSON = true
		Vue.http.post('./service/comment.php?action=addComment', post)
			.then(res => {
				if (res.data.state === 'success') {
					// 如果添加成功
					resolve(res.data)
				} else {
					reject(res)
				}
			})
			.catch(err => {
				reject(err)
			})
	})
}
// 获取评论列表
bookStore.fetchComment = bookIsbn => {
	return new Promise((resolve, reject) => {
		Vue.http.get('./service/comment.php?action=list&bookIsbn=' + bookIsbn)
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}
// 根据commentId查询
bookStore.fetchById = id => {
	return new Promise((resolve, reject) => {
		Vue.http.get('./service/comment.php?action=fetchById&commentId=' + id)
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}
export default bookStore
