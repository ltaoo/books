/* 返回最终的地址
 * @param <String> api
 * @param <Stirng> action
 * @param <String> query
 * @param <String> param
 * @return <String>
 */
export function url (api, action, query, param) {
	let url = `${api}action=${action}`
	if (query) {
		url += query && `&${query}=${param}`
	}
	return url
}
/* 返回处理好的 formData
 * @param <Object> data
 * @return <FormData>
 */
// const FormData = require('form-data')
export function convert (data) {
	let formData = new FormData()
	for (let key in data) {
		formData.append(key, data[key])
	}
	return formData
}
/* 根据会员类型返回中文说明
 * @param <String> rank
 * @return <String>
 */
export function rank (rank) {
	const rankTable = {
		0: '周卡',
		1: '月卡',
		2: '期卡'
	}
	return rankTable[rank]
}
/* 根据书籍状态返回中文说明
 * @param <String> state
 * @return <String>
 */
export function bookState (state) {
	const bookStateTable = {
		0: '正常',
		1: '正在借阅',
		2: '已出售'
	}
	return bookStateTable[state]
}
/* 获取两个时间的时间差
 * @param <Date> first
 * @param <Date> second
 * @return <>
 */
export function computedTime (dateOne, dateTwo) {
	const oneMonth = dateOne.substring(5, dateOne.lastIndexOf('-'))
	const oneDay = dateOne.substring(dateOne.length, dateOne.lastIndexOf('-') + 1)
	const oneYear = dateOne.substring(0, dateOne.indexOf('-'))
	const twoMonth = dateTwo.substring(5, dateTwo.lastIndexOf('-'))
	const twoDay = dateTwo.substring(dateTwo.length, dateTwo.lastIndexOf('-') + 1)
	const twoYear = dateTwo.substring(0, dateTwo.indexOf('-'))
	// 第一个时间减去第二个时间,第一个时间为当前时间
	// Date.parse 方法可解析一个日期时间字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数。86400000毫秒等于1天
	return (Date.parse(oneMonth + '/' + oneDay + '/' + oneYear) - Date.parse(twoMonth + '/' + twoDay + '/' + twoYear)) / 86400000
}

/* 根据书籍原价与借阅次数计算出打折后的价格
 * @param <String> price
 * @param <Number> times
 * @param <String>
 */
export function computedPriceByTimes (price, times) {
	// 先保存下原价
	// var orginal = price
	// 按原价75折作为初始价格
	const originalPrice = 0.75 * parseFloat(price)
	// 假设每次借阅折损10%
	var lossPrice = price * 0.1
	const resultPrice = originalPrice - (times * lossPrice)
	// let number = price.toFixed(1)
	// let nowDate = new Date().toLocaleDateString()
	// var first = Date.parse(nowDate)
	// var second = Date.parse(time)

	// //判断时间差，一周内的属于新上架
	// var day = (first-second)/86400000
	// //这个地方应该递进，比如上架时间超过60而且借阅次数小于6，上架时间超过90而且借阅次数小于9这样。
	// for(var i = 1;i < 3; i++) {
	// 	if(day.toFixed() > 30*i && times < 3*i) {
	// 		number = orginal*0.3
	// 		continue
	// 	}
	// }

	// number = String.prototype.split.call(number, '.')
	// if (number[1] > 5) {
	// 	number[1] = 0
	// 	number[0] = parseInt(number[0]) + 1
	// } else {
	//     number[1] = 5
	// }
	// return number.join('.')
	return resultPrice
}
/* 重置指定组件内的指定表单
 * @param <Component> component
 * @param <String> form
 */
export function resetForm (component, form) {
	component.$refs[form].resetFields()
}
