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
