<template>
  <div class="container">
    <MemberForm :member="member" :confirm="update" :cancel="reset" :update="true" />
  </div>
</template>

<script>
import {
  searchMemberById,
  updateMember,
} from '@/store/admin/member';
import router from '@/router/index';
import MemberForm from '@/containers/Admin/MemberForm';

export default {
  name: 'MemberDetail',
  data () {
    return {
      member: {},
    };
  },
  components: {
    MemberForm,
  },
  created () {
    searchMemberById(this.$route.params.id)
      .then(res => {
        console.log(res.data);
        this.member = res.data;
      })
      .catch(err => {
        this.$message({
          message: err,
        });
        router.push({
          path: '/admin/members',
        });
      });
  },
  methods: {
    // 更新用户信息
    update (member) {
      updateMember(member)
        .then(res => {
          this.$notify({
            title: '成功',
            message: '更新会员信息成功',
            type: 'success',
          });
          router.push({
            path: '/admin/members',
          });
        })
        .catch(err => {
          this.$message({
            message: err,
          });
        });
    },
    reset () {
      console.log('重置');
    },
  },
};
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
