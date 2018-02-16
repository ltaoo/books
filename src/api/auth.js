import fetch from '@/utils/fetch';

import {
  prefix,
} from '@/config/index';
import {
  convert,
} from '@/utils/index';

// 用户登录
export function login (params) {
  return fetch.post('/api/login', params);
}

// 管理员登录
export function adminLogin (post) {
  return new Promise((resolve, reject) => {
    fetch(`${prefix}/login.php`, {
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
