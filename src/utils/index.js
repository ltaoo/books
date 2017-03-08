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
