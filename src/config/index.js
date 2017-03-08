// 接口地址前缀
export const prefix = '/api'
/* 返回最终的地址
 * @param <String> api
 * @param <Stirng> action
 * @param <String> query
 * @param <String> param
 * @return <String>
 */
export function url (api, action, query, param) {
	return `${api}action=${action}&${query}=${param}`
}
