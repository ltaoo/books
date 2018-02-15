import fetch from 'isomorphic-fetch';

import {
  prefix,
} from '@/config/index';
import {
  convert,
  url,
} from '@/utils/index';

const api = `${prefix}/comment.php?`;

// 添加评论
export function addComment (post) {
  return new Promise((resolve, reject) => {
    fetch(`${prefix}/comment.php?action=addComment`, {
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
// 获取评论列表
export function fetchComments (bookIsbn) {
  return new Promise((resolve, reject) => {
    fetch(url(api, 'list', 'bookIsbn', bookIsbn))
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
// 根据commentId查询
export function searchCommentById (id) {
  return new Promise((resolve, reject) => {
    fetch(url(api, 'fetchById', 'commentId', id))
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
