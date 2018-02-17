<template>
  <div>
    <el-card>
      <h3>{{user.username}}</h3>
      <p>会员类型：
        <span>{{user.memberRank}}</span>
      </p>
      <p>学号：
        <span>{{user.memberNum}}</span>
      </p>
      <p>联系方式：
        <span>{{user.memberTel}}</span>
      </p>
      <p>地址：
        <span>{{user.memberAddress}}</span>
      </p>
      <p>登记日期：
        <span>{{user.memberCreateTime}}</span>
      </p>
    </el-card>
    <div class="row">
      <h4>正在借阅的书籍</h4>
      <template v-if="recordRes.length === 0">
        <p>没有借阅</p>
      </template>
      <template v-else>
        <el-card v-for="book in recordRes" :key="book.recordId">
          <h3>{{book.bookTitle}}</h3>
          <p>借阅时间：
            <span>{{book.borrowTime}}</span>
          </p>
        </el-card>
      </template>
    </div>
  </div>
</template>

<script>
/**
 * @file 个人中心详情
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  mapGetters,
} from 'vuex';

import {
  SEARCH_RECORDS,
} from '@/common/constants';

export default {
  name: 'PersonInfo',
  computed: mapGetters([
    'recordRes',
    'user',
  ]),
  mounted () {
    this.$store.dispatch(SEARCH_RECORDS, {
      params: {
        id: 1,
      },
    });
  },
};
</script>
<style scoped>
.el-card {
  margin-top: 0;
}
</style>
