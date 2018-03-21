<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-input type="text" placeholder="用户名" v-model="email" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-input type="password" placeholder="密码" v-model="password" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-button style="width: 100%;" type="primary" @click="login(email, password)">登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // 组件名
  name: 'LoginForm',
  props: [
    'login',
  ],
  data () {
    return {
      email: null,
      password: null,
    };
  },
};
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
