/**
 * @file 借阅记录相关 API
 * @author ltaoo<litaowork@aliyun.com>
 */
import fetch from '@/utils/fetch';
import {
  prefix,
} from '@/config/index';
import {
  url,
} from '@/utils/index';

const api = `${prefix}/getRecords.service.php?`;

/**
 * 新增借阅记录
 * @param {Object} params
 */
export function createRecord (params) {
  return fetch.post('/api/records', params);
}

/**
 * 更新指定借阅记录
 * @param {number} id - 借阅记录 id
 * @param {*} param - 更新后的完整信息
 */
export function updateRecord (id, params) {
    // 判断条件是否存在或者是否合法
  return fetch.put(`/api/records/${id}`, params);
}

/**
 * 获取借阅记录
 * @param {Object} params - 查询条件
 * @param {number} page - 页码
 * @param {number} size - 每页数量
 */
export function fetchRecords (params, page = 1, size = 20) {
  return fetch('/api/records', {
    params: {
      ...params,
      page,
      size,
    },
  });
}

// 通过书籍isbn码查询已借书籍
export function searchRecordByIsbn (param) {
  return new Promise((resolve, reject) => {
    // 判断条件是否存在或者是否合法
    fetch(url(api, 'serachByIsbn', 'bookIsbn', param))
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.data.length === 0) {
          reject('没有查询到记录');
        } else {
          resolve(json);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 通过书籍名称查询已借书籍
export function searchRecordByTitle (param) {
  return new Promise((resolve, reject) => {
    // 判断条件是否存在或者是否合法
    fetch(url(api, 'searchByTitle', 'bookTitle', param))
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.data.length === 0) {
          reject('没有查询到记录');
        } else {
          resolve(json);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 通过会员名查询已借书籍
export function searchRecordByName (param) {
  return new Promise((resolve, reject) => {
    // 判断条件是否存在或者是否合法
    fetch(url(api, 'searchByName', 'memberName', param))
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.data.length === 0) {
          reject('没有查询到记录');
        } else {
          resolve(json);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 通过会员学号查询已借书籍
export function searchRecordByNum (param) {
  return new Promise((resolve, reject) => {
    // 判断条件是否存在或者是否合法
    fetch(url(api, 'searchByNumber', 'memberNum', param))
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.data.length === 0) {
          reject('没有查询到记录');
        } else {
          resolve(json);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}
// 通过会员id查询已借书籍
export function searchRecordByMemberId (param) {
  return new Promise((resolve, reject) => {
    fetch(
      `${prefix}/getRecords.service.php?action=searchRecordsByMemberId&memberId=${param}`,
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
