/**
 * @file 身份相关的 module
 * @author ltaoo<litaowork@aliyun.com>
 */

import {
  LOGIN,
  LOGOUT,
  FETCH_USER,
} from '@/common/constants';
import {
  HOME,
  ADMIN_HOME,
  USER_LOGIN,
} from '@/common/path';
import {
  login,
} from '@/api/auth';
import router from '@/router';

const mapUrl = (function () {
  const URL_MAP = [
    // 读者
    HOME,
    // 管理员
    ADMIN_HOME,
  ];
  return function mapUrl (type) {
    return URL_MAP[type] || HOME;
  };
})();

// state
const state = {
  data: null,
};
// getter
const getters = {
  user: state => state.data,
  login: state => !!state.data,
  isAdmin: state => state.data && state.data.role === 1,
};

// actions
const actions = {
  [LOGIN] ({
    commit,
  }, payload) {
    login(payload)
      .then(res => {
        // 获取到redirect
        commit('LOGIN', res);
        localStorage.setItem('user', JSON.stringify(res));
        // 根据权限跳转不同的首页
        router.push({
          path: mapUrl(res.role),
        });
      }, (err) => {
        alert(err);
      });
  },
  [LOGOUT] ({
    commit,
  }) {
    localStorage.removeItem('user');
    router.push({
      path: USER_LOGIN,
    });
    commit('LOGOUT');
    commit('CLEAR');
  },
  [FETCH_USER] ({
    commit,
  }) {
    const userInfo = localStorage.getItem('user');
    commit('FETCH_USER', userInfo ? JSON.parse(userInfo) : null);
  },
};
// mutations
const mutations = {
  // 登录
  LOGIN (state, payload) {
    state.data = payload;
  },
  // 登出
  LOGOUT (state) {
    state.data = null;
  },
  FETCH_USER (state, payload) {
    state.data = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
