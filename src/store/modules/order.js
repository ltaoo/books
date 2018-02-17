/**
 * @file record 对应的 module
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  Message,
} from 'element-ui';
import {
  FETCH_ORDERS,
  UPDARE_ORDER,
} from '@/common/constants';
import {
  fetchOrders,
  confirmOrder,
} from '@/api/admin/order';
import {
  searchBookById,
} from '@/api/books';
import {
  searchMemberById,
} from '@/api/admin/member';

// state
const state = {
  data: [],
};
// getters
const getters = {
  orders: state => {
    return state.data;
  },
};
// actions
const actions = {
  /**
   * 订单记录
   */
  [FETCH_ORDERS] ({
    commit,
  }, params) {
     // 获取所有订单记录
    fetchOrders()
      .then(res => {
        // 在这个地方处理商品列表
        res.data.map(obj => {
          let booklist = obj.booklist;
          const bookIdList = booklist.split('|');
          const resultlist = bookIdList.map(id => {
            return searchBookById(id);
          });

          const memberId = obj.memberId;
          Promise.all([
            Promise.all(resultlist),
            searchMemberById(memberId),
          ])
            .then(res => {
              obj.booklist = res[0].map(res => {
                return res.data;
              });
              const member = res[1].data;
              obj.member = member;
              commit('save_data', obj);
            });
        });
      });
  },
  [UPDARE_ORDER] ({
    commit,
  }, {
    id,
    params,
  }) {
    console.log(params);
    confirmOrder(id, params)
      .then(res => {
        Message({
          message: params.orderState === 1 ? '订单确认成功' : '订单取消成功',
        });
      });
  },
};
// mutations
const mutations = {
  save_data (state, payload) {
    state.data.push(payload);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
