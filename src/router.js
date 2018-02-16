/**
 * @file 路由配置
 * @author ltaoo<litaowork@aliyun.com>
 */

import Vue from 'vue';
import Router from 'vue-router';

import BasicLayout from '@/Layout/BasicLayout';

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
// 用户登陆页
import UserLogin from '@/routes/Login/index.vue';
// 购买成功提示页
import Success from '@/containers/Success.vue';
// 个人中心首页
import Person from '@/containers/Person/Index.vue';
// 个人中心信息页
import Info from '@/containers/Person/Info.vue';
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
// 后台根视图
import Admin from '@/containers/Admin/Index.vue';
// 后台主页也就是借书页
import Borrow from '@/containers/Admin/Borrow.vue';
// 还书页
import Return from '@/containers/Admin/Return.vue';
// 书籍列表页
import Books from '@/containers/Admin/Books.vue';
// 会员列表页
import Members from '@/containers/Admin/Members.vue';
// 会员详情页
import MemberDetail from '@/containers/Admin/MemberDetail.vue';
// 借阅记录页
import Records from '@/containers/Admin/Records.vue';
// 订单记录页
import Orders from '@/containers/Admin/Orders.vue';
// 管理员登陆页
import AdminLogin from '@/containers/Admin/AdminLogin.vue';
/* ----------------
 * 公共页面
 ----------------- */
// 404
import NotFound from '@/containers/NotFound.vue';

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
              path: 'info',
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
      component: UserLogin,
    },
    {
      path: '/success',
      name: 'Success',
      component: Success,
    },
    {
      // 后台根视图
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: { adminAuth: true, },
      redirect: '/admin/index',
      children: [
        {
          // 借书页
          path: 'index',
          name: 'Borrow',
          component: Borrow,
          meta: { adminAuth: true, },
        },
        {
          // 还书页
          path: 'return',
          name: 'Return',
          component: Return,
          meta: { adminAuth: true, },
        },
        {
          // 会员列表页
          path: 'members',
          name: 'Members',
          component: Members,
          meta: { adminAuth: true, },
        },
        {
          // 书籍列表页
          path: 'books',
          name: 'Books',
          component: Books,
          meta: { adminAuth: true, },
        },
        {
          // 借阅记录列表页
          path: 'records',
          name: 'Records',
          component: Records,
          meta: { adminAuth: true, },
        },
        {
          // 订单列表页
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { adminAuth: true, },
        },
        {
          // 会员修改页
          path: 'member/:id',
          name: 'MemberDetail',
          component: MemberDetail,
          meta: { adminAuth: true, },
        },
      ],
    },
    {
      // 管理员登录
      path: '/adminlogin',
      name: 'AdminLogin',
      component: AdminLogin,
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
    // 用户登录验证
    if (localStorage.getItem('userId')) {
      next();
    } else {
      next({
        path: '/userlogin',
        query: {
          redirect: to.fullPath,
        },
      });
    }
  } else if (to.matched.some(record => record.meta.adminAuth)) {
    if (localStorage.getItem('adminLogin')) {
      next();
    } else {
      next({
        path: '/adminlogin',
        query: {
          redirect: to.fullPath,
        },
      });
    }
  } else {
    next();
  }
});

export default router;
