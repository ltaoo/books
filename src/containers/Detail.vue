<template>
  <div class="container">
    <el-card>
      <img style="float: left;" :src="book.bookImg" :alt="book.bookTitle">
      <div style="margin-left: 160px;">
        <p>ISBN：
          <span>{{book.bookIsbn}}</span>
        </p>
        <p>被借阅次数：
          <span>{{book.borrowTimes}}</span>
        </p>
        <p>原价：
          <del>{{book.bookPrice}}</del>现价：
          <span>{{book.bookPrice}}</span>
        </p>
        <template v-if="book.returnTime !== 0">
          <el-button type="success" v-on:click="addCart(book)">加入购物车</el-button>
        </template>
        <template v-else>
          <p>该书正在被借阅</p>
        </template>
      </div>
      <h4>书籍简介</h4>
      <p>{{book.bookSummary}}</p>
    </el-card>
    <h4>书籍评论</h4>
    <div class="content" v-for="comment in commentlist" :key="comment.commentId">
      <el-card>
        <!-- <p>{{comment.memberName}}||<span>{{comment.createtime}}</span></p> -->
        <span>{{comment.content}}</span>
      </el-card>
    </div>
    <el-input style="margin-top: 20px;" type="textarea" :autosize="{ minrows: 2, maxrows: 4}" placeholder="请输入评论" v-model="comment">
    </el-input>
    <el-button style="margin-top: 20px;" type="success" @click="addComment(comment)">提交评论</el-button>
  </div>
</template>

<script>
/* eslint-disable */
import {
  searchBookById,
} from '@/api/books';
import {
  searchMemberById,
} from '@/api/admin/member';
import {
  fetchComments,
  addComment,
  searchCommentById,
} from '@/api/comment';

export default {
  name: 'GoodsDetail',
  data () {
    return {
      book: {},
      commentlist: [],
      comment: '',
    };
  },
  created () {
    searchBookById(this.$route.params.id)
      .then(res => {
        // console.log(res.data)
        // 获取评论列表
        fetchComments(res.data.bookIsbn)
          .then(resp => {
            // 获取评论用户信息
            resp.data.forEach(obj => {
              searchMemberById(obj.memberId)
                .then(respo => {
                  obj.memberId = respo.data;
                })
                .catch(err => {
                  this.$message({
                    message: err,
                  });
                });
            });
            this.commentlist = resp.data;
          })
          .catch(err => {
            this.$message({
              message: err,
            });
          });
        this.book = res.data;
      })
      .catch(err => {
        this.$message({
          message: err,
        });
      });
  },
  methods: {
    addComment (content) {
      // 获取相关数据
      const post = {
        memberId: localStorage.getItem('userId'),
        bookIsbn: this.book.bookIsbn,
        content: content,
      };
      // 写入数据库
      addComment(post)
        .then(res => {
          this.$message({
            message: '评论成功',
          });
          // 根据id查询到评论
          searchCommentById(res.commentId)
            .then(res => {
              this.commentlist.push(res.data);
              this.comment = '';
            })
            .catch(err => {
              this.$message({
                message: err,
              });
            });
        })
        .catch(err => {
          this.$messgae({
            messgae: err,
          });
        });
    },
  },
};
</script>
