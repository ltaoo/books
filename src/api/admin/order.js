/**
 * @file 订单相关 API
 * @author ltaoo<litaowork@aliyun.com>
 */
import fetch from '@/utils/fetch';
import {
  prefix,
} from '@/config/index';
import {
  convert,
} from '@/utils/index';

/**
 * 获取所有订单
 * @param {Object} params - 查询 path
 * @param {number} page - 页码
 * @param {number} size - 每页数量
 */
export function fetchOrders (params, page = 1, size = 20) {
  return fetch('/api/orders', {
    params: {
      ...params,
      page,
      size,
    },
  });
}

// 生成订单
export function createOrder (post) {
  return new Promise((resolve, reject) => {
    fetch(`${prefix}/order.php?action=createOrder`, {
      method: 'POST',
      body: convert(post),
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 更新订单
 * @param {number} id - 订单 id
 * @param {Object} params - 新订单信息
 */
export function confirmOrder (id, params) {
  return fetch.put(`/api/orders/${id}`, params);
}

/**
 * 取消订单
 * @param {number} id - 订单 id
 */
export function cancelOrder (id, params) {
  return fetch(`/api/orders/${id}`, params);
}

// 根据会员id查询订单列表
export function fetchOrdersByMemberId (memberId) {
  return new Promise((resolve, reject) => {
    fetch(`${prefix}/order.php?action=list&memberId=` + memberId)
      .then(res => {
        return res.json();
      })
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        reject(err);
      });
  });
}
