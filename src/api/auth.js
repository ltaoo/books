import fetch from '@/utils/fetch';

const apiPrefix = '/api/v1.0';
/**
 * 用户登录
 */
export function login (params) {
  return fetch.post(`${apiPrefix}/login`, params);
}

/**
 * 管理员登录
 */
export function adminLogin (params) {
  return fetch.post('/api/admin/login', params);
}
