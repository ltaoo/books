<template>
  <div class="container">
    <LoginForm :login="login" />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import {
  login,
} from '@/store/auth';
import router from '@/router';
import {
  rank,
} from '@/utils/index';

export default {
  name: 'UserLogin',
  components: {
    LoginForm,
  },
  methods: {
    login (username, password) {
      // 用户登录
      const user = {
        username,
        password,
      };
      login(user)
        .then(res => {
          // 获取到redirect
          const url = decodeURIComponent(this.$route.query.redirect || '/');
          const member = {
            memberId: res.data[0],
            memberName: res.data[1],
            memberNum: res.data[2],
            memberTel: res.data[3],
            memberAddress: res.data[4],
            memberRank: rank(res.data[5]),
            memberCreateTime: res.data[6],
          };
          // 登录成功后获取到的信息就是用户的完整信息，将其保存至 store
          this.$store.commit('LOGIN', member);
          router.push({
            path: url,
          });
        })
        .catch(() => {
          this.$message({
            message: '用户名或密码错误',
          });
        });
    },
  },
};
</script>
