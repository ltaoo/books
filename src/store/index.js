import Vue from 'vue';
import Vuex from 'vuex';

import global from '@/store/modules/global';
import books from '@/store/modules/books';
import auth from '@/store/modules/auth';
import member from '@/store/modules/member';
import record from '@/store/modules/record';
import order from '@/store/modules/order';

import {
  INIT,
  FETCH_USER,
} from '@/common/constants';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    global,
    auth,
    books,
    member,
    record,
    order,
  },
  strict: debug,
});

store.dispatch(INIT);
store.dispatch(FETCH_USER);

export default store;
