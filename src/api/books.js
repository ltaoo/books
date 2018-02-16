/**
 * @file 和书籍相关的 api
 * @author ltaoo<litaowork@aliyun.com>
 */
import fetchJsonp from 'fetch-jsonp';
import {
  prefix,
  doubanApi,
} from '@/config/index';
import {
  url,
} from '@/utils/index';
import fetch from '@/utils/fetch';

const bookapi = `${prefix}/getBooks.service.php?`;

/**
 * 获取所有书籍
 */
export function fetchBooks () {
  return fetch('/api/books');
}
/**
 * 从豆瓣 api 查询书籍
 */
export function searchByDouban (param) {
  return new Promise((resolve, reject) => {
    fetchJsonp(`${doubanApi}q=${param}&count=10`, {
      jsonpCallback: 'callback',
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        resolve(json);
      })
      .catch(ex => {
        reject(ex);
      });
  });
}
/**
 * 添加书籍到数据库
 */
export function createBook (params) {
  return fetch.post('/api/books', params);
}
// 根据 id 查询书籍
export function searchBookById (id) {
  return new Promise((resolve, reject) => {
    fetch(url(bookapi, 'searchById', 'bookId', id))
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
// 通过书籍ISBN码查询书籍
export function searchBookByIsbn (param) {
  return new Promise((resolve, reject) => {
    fetch(url(bookapi, 'searchByIsbn', 'bookIsbn', param))
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
// 通过书籍名查询书籍
export function searchBookByName (param) {
  return new Promise((resolve, reject) => {
    fetch(url(bookapi, 'searchByName', 'bookName', param))
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

// 更新书籍状态
export function updateBookState (param, state) {
  return new Promise((resolve, reject) => {
    fetch(
      `${prefix}/getBooks.service.php?action=updateState&bookId=${param}&state=${state}`,
    )
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
