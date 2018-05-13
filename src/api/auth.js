import fetch from '@/utils/fetch';

/**
 * 用户登录
 */
export function login (params) {
  return fetch.post(`/api/login`, params);
}
export function logout (params) {
  return fetch('/api/logout');
}

/**
 * 管理员登录
 */
export function adminLogin (params) {
  return fetch.post('/api/admin/login', params);
}
