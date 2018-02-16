<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-menu class="sidenav" theme="dark">
          <el-menu-item index="1">
            <router-link :to="{ path: '/admin/index' }">租书</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link :to="{ path: '/admin/return' }">还书</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link :to="{ path: '/admin/books' }">书籍列表</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link :to="{ path: '/admin/members' }">用户列表</router-link>
          </el-menu-item>
          <el-menu-item index="5">
            <router-link :to="{ path: '/admin/records' }">借阅记录</router-link>
          </el-menu-item>
          <el-menu-item index="6">
            <router-link :to="{ path: '/admin/orders' }">订单列表</router-link>
          </el-menu-item>
          <el-menu-item index="7" v-if="isLogin">
            <a @click="dialogVisible = true">注销</a>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <Headers
          :routes="[]"
          :user="user"
        />
        <div class="container__content">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>确定要退出登录吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * @file 后台根视图
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  mapGetters,
} from 'vuex';
import {
  INIT_ADMIN,
} from '@/common/constants';
import Headers from '@/components/Headers/index.vue';
import router from '@/router';

export default {
  name: 'AdminIndex',
  components: {
    Headers,
  },
  data () {
    return {
      isLogin: false,
      dialogVisible: false,
      user: null,
    };
  },
  computed: mapGetters([
    'admin',
  ]),
  created () {
    this.$store.dispatch(INIT_ADMIN);
  },
  methods: {
    logout () {
      localStorage.removeItem('adminLogin');
      router.push({
        path: '/',
      });
    },
  },
};
</script>

<style>
.sidenav {
  width: 100%;
  height: 100vh;
}
.container__content {
  padding: 10px;
}
</style>
