/**
 * @file 身份相关的 module
 * @author ltaoo<litaowork@aliyun.com>
 */

import {
  LOGIN,
} from '@/common/constants';
import {
  HOME,
  ADMIN_HOME,
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
// actions
const actions = {
  [LOGIN] ({
    commit,
  }, payload) {
    login(payload)
      .then(res => {
        // 获取到redirect
        commit('LOGIN', res);
        // 根据权限跳转不同的首页
        router.push({
          path: mapUrl(res.role),
        });
      }, (err) => {
        alert(err);
      });
  },
};
// mutations
const mutations = {
  // 登录
  LOGIN (state, payload) {
    state.data = payload;
    localStorage.setItem('userid', JSON.stringify(payload));
  },
  // 登出
  LOGOUT (state) {
    localStorage.removeItem('userid');
    state.data = null;
  },
};

export default {
  state,
  actions,
  mutations,
};
