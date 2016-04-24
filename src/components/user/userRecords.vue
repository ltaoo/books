<template>
  <div>
    <h4>借阅记录</h4>
    <template v-if="hasRecord === true">
      <input type="text" class="form-control" v-model="query">
      <table class="table">
        <tr>
          <th></th>
          <th>书籍ISBN码</th>
          <th>书籍名称</th>
          <th>借阅时间</th>
          <th>归还时间</th>
        </tr>
        <tr v-for = "record in recordlist | filterBy query">
          <td>{{$index + 1}}</td>
          <td>{{record.bookIsbn}}</td>
          <td>{{record.bookTitle}}</td>
          <td>{{record.borrowTime}}</td>
          <td>{{record.returnTime | returnFilter record.borrowTime record.memberRank}}</td>
        </tr>
      </table>
    </template>
    <template v-else>
      <p>还没有借阅记录</p>
    </template>
  </div>
</template>

<script>
  import store from '../../store/admin.js';
  export default {
    data () {
      return {
        recordlist: [],
        hasRecord: false
      }
    },
    route: {
      data ( to ) {
        //根据用户id搜索借阅记录
        store.searchAllRecordByMemberId(localStorage.userid).then(res => {
          //有记录
          console.log(res.data);
          this.hasRecord = true;
          this.recordlist = res.data;
        }).catch(err => {
          //没有借阅记录
          console.log(err);
        })
      }
    }
  }
</script>