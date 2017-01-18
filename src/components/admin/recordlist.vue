<template>
  <div class="container">
    <ul class="nav">
      <li><a v-link="{ path: '/admin' }">租书</a></li>
      <li><a v-link="{ path: '/return' }">还书</a></li>
      <li><a v-link="{ path: '/bookList' }">书籍列表</a></li>
      <li><a v-link="{ path: '/memberList' }">用户列表</a></li>
      <li><a v-link="{ path: '/recordList' }">借阅记录</a></li>
      <li><a v-link="{ path: '/orderList' }">订单记录</a></li>
    </ul>
		<h3>借阅记录列表页</h3>
		<hr>
    {{recordlist | searchBy}}
    <div class="row">
      <form action="" class="form-inline">
        <input type="text" class="form-control" placeholder="请输入信息查找" v-model="query">
        <input type="radio" name="filter" value="0" v-model="filter" checked=true>全部
        <input type="radio" name="filter" value="1" v-model="filter">未还
        <input type="radio" name="filter" value="2" v-model="filter">超期
      </form>
    </div>
    <div class="row" style="margin-top:10px;">
      <table class="table">
        <tr>
          <th></th>
          <th>会员学号</th>
          <th>会员名称</th>
          <th>会员类型</th>
          <th>登记时间</th>
          <th>书籍ISBN码</th>
          <th>书籍名称</th>
          <th>借阅时间</th>
          <th>状态</th>
        </tr>
        <tr v-for = "record in recordlist | filterBy query | searchBy filter">
          <td>{{$index + 1}}</td>
          <td>{{record.memberNum}}</td>
          <td>{{record.memberName}}</td>
          <td>{{record.memberRank | rank}}</td>
          <td>{{record.memberCreateTime}}</td>
          <td>{{record.bookIsbn}}</td>
          <td>{{record.bookTitle}}</td>
          <td>{{record.borrowTime}}</td>
          <td>{{record.returnTime | returnFilter record.borrowTime record.memberRank}}</td>
        </tr>
      </table>
    </div>
	</div>
</template>

<script>
  import Admin from '../../store/admin.js';
  export default {
    name: 'recordlist',
    data() {
      return {
        recordlist: []
      }
    },
    route: {
      data ({ to }) {
        Admin.getRecordList().then(res => {
          console.log(res.data)
          this.recordlist = res.data
        })
      }
    }
  }
</script>