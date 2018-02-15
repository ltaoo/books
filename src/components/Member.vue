<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="avatar" class="member__avatar">
    <div style="padding: 14px;">
      <span>{{member.memberName}} - {{rank}}</span>
      <div class="bottom clearfix">
        <time class="time">{{member.memberCreateTime}}</time>
      </div>
      <p v-if="member.borrowNum !== '0'">已借图书({{member.borrowNum}})</p>
      <div v-else>
        <p v-if="outdate">会员已超期</p>
        <el-button v-else class="button" type="primary" @click="choose(member)">选择</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import avatar from '@/assets/avatar.jpeg';
import {
  rank,
  computedTime,
} from '@/utils/index';

export default {
  // 组件名
  name: 'Member',
  // 从父组件传过来的属性
  props: [
    'member',
    'choose',
  ],
  data () {
    return {
      avatar,
    };
  },
  computed: {
    rank () {
      return rank(this.member.memberRank);
    },
    outdate () {
      // 根据会员类型、登记时间计算是否已超期
      const createTime = this.member.memberCreateTime;
      const rank = this.member.memberRank;
      // 获取当前时间
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      // 当前时间
      const nowTime = year + '-' + month + '-' + day;
      // 获取时间差
      console.log(createTime);
      const cha = computedTime(nowTime, createTime);
      if (rank === '1' && cha > 30) {
        // 如果是月卡会员而且超期了，就显示超期
        return true;
      } else {
        // 这里的都是期卡
        return false;
      }
    },
  },
};
</script>

<style>
.member__avatar {
  width: 100%;
}
.time {
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.button {
  width: 100%;
  margin-top: 20px;
}
.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
</style>
