import fetch from '@/utils/fetch';
import {
  prefix,
} from '@/config/index';
import {
  url,
  convert,
} from '@/utils/index';

const api = `${prefix}/cart.php?`;
// 获取购物车列表
export function fetchCartList (session) {
  return new Promise((resolve, reject) => {
    fetch(url(api, 'list', 'cartSession', session))
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

// 加入购物车
export function addToCart (obj) {
  return new Promise((resolve, reject) => {
    fetch(`${prefix}/cart.php?action=addCart`, {
      method: 'POST',
      body: convert(obj),
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
// 从购物车中移除指定商品，还要确定是移除了该用户的，所以还要传入cartSession
export function removeFromCart (obj) {
  return new Promise((resolve, reject) => {
    fetch(
      `${prefix}/cart.php?action=delete&cartSession=${obj.cartSession}&bookId=${
        obj.bookId
      }`,
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

// 清空购物车
export function emptyCart (cartSession) {
  return new Promise((resolve, reject) => {
    fetch(`${prefix}/cart.php?action=emptyCart&cartSession=` + cartSession)
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
