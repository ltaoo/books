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
import Record from '@/components/Record.vue';
// 数据处理
import {
  returnBook,
  searchRecordByIsbn,
  searchRecordByTitle,
  searchRecordByName,
  searchRecordByNum,
} from '@/api/admin/records';
export default {
  name: 'Return',
  components: {
    Record,
  },
  data () {
    return {
      records: [],
      query: '',
    };
  },
  methods: {
    search (param) {
      // 判断是否存在
      if (!param || !param.trim()) {
        this.$message({
          message: '请输入查询条件',
        });
      } else {
        searchRecordByIsbn(param)
          .then(res => {
            // console.log('根据isbn')
            this.records = res.data;
            return Promise.reject('break');
          })
          .catch(err => {
            if (err !== 'break') {
              return searchRecordByTitle(param);
            } else {
              return Promise.reject('break');
            }
          })
          .then(res => {
            // console.log('根据title')
            this.records = res.data;
            return Promise.reject('break');
          })
          .catch(err => {
            if (err !== 'break') {
              return searchRecordByName(param);
            } else {
              return Promise.reject('break');
            }
          })
          .then(res => {
            // console.log('根据name')
            this.records = res.data;
            return Promise.reject('break');
          })
          .catch(err => {
            if (err !== 'break') {
              return searchRecordByNum(param);
            } else {
              return Promise.reject('break');
            }
          })
          .then(res => {
            // console.log('根据num')
            this.records = res.data;
            return Promise.reject('break');
          })
          .catch(err => {
            if (err !== 'break') {
              this.$message({
                message: err,
              });
            }
          });
      }
    },
    returnBook (record) {
      // 这里处理数据，更新records。
      const recordId = record.recordId;
      // console.log(recordId)
      returnBook(recordId)
        .then(res => {
          this.$message({
            message: '归还成功',
          });
          this.query = null;
          this.reocrds = [];
        })
        .catch(err => {
          this.$message({
            message: err,
          });
        });
    },
  },
};
</script>
