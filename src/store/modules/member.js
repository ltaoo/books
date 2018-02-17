/**
 * @file member 对应的 module
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  Message,
} from 'element-ui';
import {
  FETCH_MEMBER,
  SEARCH_MEMBER,
  ADD_MEMBER,
  SELECT_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,
} from '@/common/constants';
import {
  fetchMembers,
  createMember,
  updateMember,
  deleteMember,
} from '@/api/admin/member';

// state
const state = {
  data: [],
  memberRes: [],
  currentMember: {},
};
// getters
const getters = {
  members: state => {
    return state.data;
  },
  memberRes: state => state.memberRes,
  currentMember: state => state.currentMember,
};
// actions
const actions = {
  /**
   * 搜索会员
   */
  [FETCH_MEMBER] ({
    commit,
  }, {
    params,
    cb,
  }) {
    fetchMembers(params)
      .then(res => {
        if (cb) {
          cb(res);
        }
        commit('save_members', res.data);
      });
  },
  /**
   * 搜索会员
   */
  [SEARCH_MEMBER] ({
    commit,
  }, {
    params,
    cb,
  }) {
    fetchMembers(params)
      .then(res => {
        if (cb) {
          cb(res.data);
        }
        commit('set_result', res.data);
      });
  },
  [ADD_MEMBER] ({
    commit,
  }, {
    params,
    cb,
  }) {
    createMember(params)
      .then((res) => {
        commit('add_member', res.data);
        if (cb) {
          cb();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  [SELECT_MEMBER] ({
    commit,
  }, payload) {
    commit('select_member', Object.assign({}, payload, {
      memberRank: parseInt(payload.memberRank, 10),
    }));
  },
  [UPDATE_MEMBER] ({
    commit,
  }, {
    id,
    member,
    cb,
  }) {
    updateMember(id, member)
      .then((res) => {
        alert('更新成功');
        if (cb) {
          cb();
        }
      });
  },
  [DELETE_MEMBER] ({
    commit,
  }, id, index) {
    deleteMember(id)
      .then((res) => {
        Message.success('移除成功');
        commit('delete_member', index);
      });
  },
};
// mutations
const mutations = {
  save_members (state, books) {
    state.data = books;
  },
  set_result (state, payload) {
    state.memberRes = payload;
  },
  add_member (state, payload) {
    // 直接 push，而不是给一个新数组，这里和 react 不太一样，因为
    // vue 对数组做了监听，所以可以直接改变原数组，react 是单纯的 diff
    state.data.push(payload);
  },
  select_member (state, payload) {
    state.currentMember = payload;
  },
  delete_member (state, index) {
    state.data.splice(index, 1);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

