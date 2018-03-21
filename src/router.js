/**
 * @file 路由配置
 * @author ltaoo<litaowork@aliyun.com>
 */

import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';

import BasicLayout from '@/Layout/BasicLayout';
import SideLayout from '@/Layout/SideLayout';

import {
  USER_LOGIN,
} from '@/common/path';
/* ----------------
 * 前台
 ----------------- */
// 首页
import Index from './routes/Index/index.vue';
// 商品详情页
import Detail from '@/containers/Detail.vue';
// 购买成功提示页
import Success from '@/containers/Success.vue';
// 个人中心首页
import Person from '@/routes/Person/index.vue';
// 个人中心信息页
import Info from '@/routes/Person/Detail/index.vue';
// 个人中心借阅记录页
import PersonRecords from '@/containers/Person/Records.vue';
// 个人中心订单记录页
import PersonOrders from '@/containers/Person/Orders.vue';
// 个人中心设置地址页
// import Address from '@/components/Person/userAddress.vue'
// 购物车组件
// import Cart from '@/components/cart/index.vue'
// 结算页面
import Order from '@/containers/Order.vue';

/* ----------------
 * 后台
 ----------------- */
// 后台主页也就是借书页
import Borrow from '@/routes/Admin/Borrow/index.vue';
// 还书页
import Return from '@/routes/Admin/Return/index.vue';
// 书籍列表页
import Books from '@/routes/Admin/Goods/index.vue';
// 会员列表页
import Members from '@/routes/Admin/Member/index.vue';
// 借阅记录页
import Records from '@/routes/Admin/Record/index.vue';
// 订单记录页
import Orders from '@/routes/Admin/Order/index.vue';
/* ----------------
 * 公共页面
 ----------------- */
// 登陆
import Login from '@/routes/Login/index.vue';
// 404
import NotFound from '@/containers/NotFound.vue';
import NoPermission from '@/routes/NoPermission.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      // 根路径
      path: '/',
      name: 'root',
      component: BasicLayout,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: '首页',
          component: Index,
        },
        {
          // 订单结算页
          path: 'order',
          name: 'OrderCount',
          component: Order,
          meta: { requiresAuth: true, },
        },
        {
          // 商品详情页
          path: 'goods/:id',
          name: 'GoodsDetail',
          component: Detail,
        },
        {
          // 用户主页
          path: 'person',
          name: 'Person',
          component: Person,
          meta: { requiresAuth: true, },
          children: [
            {
              // 用户信息页
              path: 'detail',
              component: Info,
              meta: { requiresAuth: true, },
            },
            {
              // 用户订单列表页
              path: 'orders',
              name: 'PersonOrders',
              component: PersonOrders,
              meta: { requiresAuth: true, },
            },
            {
              // 用户借阅记录页
              path: 'records',
              name: 'PersonRecords',
              component: PersonRecords,
              meta: { requiresAuth: true, },
            },
          ],
        },
      ],
    },
    {
      path: USER_LOGIN,
      name: '登录',
      component: Login,
    },
    {
      path: '/success',
      name: 'Success',
      component: Success,
    },
    {
      // 后台根视图
      path: '/admin',
      name: '后台首页',
      component: SideLayout,
      meta: { adminAuth: true, },
      redirect: '/admin/index',
      children: [
        {
          // 借书页
          path: 'index',
          name: '借阅',
          component: Borrow,
          meta: { adminAuth: true, },
        },
        {
          // 还书页
          path: 'return',
          name: '还书',
          component: Return,
          meta: { adminAuth: true, },
        },
        {
          // 会员列表页
          path: 'members',
          name: '会员列表',
          component: Members,
          meta: { adminAuth: true, },
        },
        {
          // 书籍列表页
          path: 'books',
          name: '书籍列表',
          component: Books,
          meta: { adminAuth: true, },
        },
        {
          // 借阅记录列表页
          path: 'records',
          name: '借阅记录列表',
          component: Records,
          meta: { adminAuth: true, },
        },
        {
          // 订单列表页
          path: 'orders',
          name: '订单列表',
          component: Orders,
          meta: { adminAuth: true, },
        },
      ],
    },
    {
      path: '/no_permission',
      component: NoPermission,
    },
    {
      // 404
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

// 认证钩子
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // // 用户登录验证
    // if (localStorage.getItem('user')) {
    //   next();
    // } else {
    //   next({
    //     path: '/login',
    //     query: {
    //       redirect: to.fullPath,
    //     },
    //   });
    // }
    next();
  } else if (to.matched.some(record => record.meta.adminAuth)) {
    console.log(to.matched);
    // 从 store 中读取
    const user = store.state.global.data;
    if (!user) {
      next({
        path: '/login',
      });
      return;
    }
    const {
      role,
    } = user;
    console.log('role', user, role);
    if (role !== 1) {
      next({
        path: '/no_permission',
      });
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
