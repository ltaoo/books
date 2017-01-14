<template>
  <div class="row">
    <h3>{{member.memberName}}</h3>
    <p>借阅类型：<span>{{member.memberRank | rank}}</span></p>
    <p>学号：<span>{{member.memberNum}}</span></p>
    <p>联系方式：<span>{{member.memberTel}}</span></p>
    <p>地址：<span>{{member.memberAddress}}</span></p>
    <p>登记日期：<span>{{member.memberCreateTime}}</span></p>
  </div>
  <div class="row">
    <h4>正在借阅的书籍</h4>
    <div v-if="borrowBook == false">
      <p>没有借阅书籍</p>
    </div>
    <div v-else>
      <h3>{{book.bookTitle}}</h3>
      <p>借阅时间：<span>{{book.borrowTime}}</span></p>
    </div>
  </div>
</template>

<script>
  import store from '../../store/admin.js';
  export default {
    name: 'userinfo',
    data () {
      return {
        member: null,
        borrowBook: false,
        book: null
      }
    },
    route: {
      data (to) {
        //console.log(localStorage.userid);
        //查询用户信息
        store.getMemberById(localStorage.userid).then(res => {
          console.log(res.data);
          this.member = res.data;
        }).catch(err => {
          console.log(err);
        })
        //查询借阅记录
        store.searchRecordByMemberId(localStorage.userid).then(res => {
          console.log(res.data);
          if(res.state === 200) {
            //如果有借阅记录
            this.borrowBook = true;
            this.book = res.data;
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>