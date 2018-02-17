<template>
  <div class="container">
    <el-input placeholder="请输入会员姓名或学号查询" icon="search" v-model="query" :on-icon-click="search.bind(this, query)">
    </el-input>
    <el-row :gutter="10">
      <el-col :span="12" v-for="record in records" :key="record.recordId">
        <Record :record="record" :choose="returnBook" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * @file 还书页
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  mapGetters,
} from 'vuex';

import {
  FETCH_RECORDS,
  UPDATE_RECORD,
} from '@/common/constants';
import Record from '@/components/Record.vue';

export default {
  name: 'Return',
  components: {
    Record,
  },
  data () {
    return {
      query: '',
    };
  },
  computed: mapGetters([
    'records',
  ]),
  methods: {
    /**
     * 搜索图书
     */
    search (param) {
      if (!param || !param.trim()) {
        this.$message({
          message: '请输入查询条件',
        });
      } else {
        this.$store.dispatch(FETCH_RECORDS, {
          params: {
            title: param,
          },
        });
      }
    },
    /**
     * 归还图书
     */
    returnBook (record) {
      // 这里处理数据，更新records。
      const recordId = record.recordId;
      this.$store.dispatch(UPDATE_RECORD, {
        id: recordId,
        params: {
          recordState: 2,
        },
      });
    },
  },
};
</script>
