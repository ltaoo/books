<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <router-link :to="{ path: PERSON_HOME }">用户主页</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link :to="{ path: PERSON_RECORDS }">借阅记录</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link :to="{ path: PERSON_ORDERS }">订单管理</router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * @file 个人中心首页
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  PERSON_HOME,
  PERSON_RECORDS,
  PERSON_ORDERS,
} from '@/common/path';

export default {
  name: 'person_home',
  data () {
    return {
      PERSON_HOME,
      PERSON_RECORDS,
      PERSON_ORDERS,
    };
  },
};
</script>
