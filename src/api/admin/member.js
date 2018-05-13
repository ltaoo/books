/**
 * @file 会员相关接口
 * @author ltaoo<litaowork@aliyun.com>
 */
import fetch from '@/utils/fetch';

/**
 * 搜索会员
 */
export function fetchMembers (params, page = 1, size = 20) {
  return fetch('/api/users/', {
    params: {
      ...params,
      page,
      size,
    },
  });
}
/**
 * 根据用户Id获取信息
 * @param {number} id - 会员 id
 */
export function searchMemberById (id) {
  return fetch(`/api/members/${id}`);
}
/**
 * 添加会员到数据库
 * @param {Object} member - 会员信息
 */
export function createMember (params) {
  return fetch.post('/api/members', params);
}
/**
 * 更新会员信息
 * @param {number} id - 会员 id
 * @param {Object} params - 更新后的完整会员信息
 */
export function updateMember (id, params) {
  return fetch.put(`/api/members/${id}`, params);
}
/**
 * 删除会员
 * @param {number} id - 会员 id
 */
export function deleteMember (id) {
  return fetch.delete(`/api/members/${id}`);
}
