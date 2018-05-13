<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-input
          placeholder="请输入书籍名或ISBN码查询"
          icon="search"
          v-model="query"
          @click="searchBooks"
        >
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button style="width: 100%;" type="primary" @click="dialogVisible = true">添加新书籍</el-button>
      </el-col>
    </el-row>
    <el-table :data="books" stripe style="margin-top: 20px; width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="id">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="书籍名">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="ISBN 码">
              <span>{{ props.row.isbn }}</span>
            </el-form-item>
            <el-form-item label="借阅次数">
              <span>{{ props.row.borrowTimes }}</span>
            </el-form-item>
            <el-form-item label="当前状态">
              <span>{{ props.row.state }}</span>
            </el-form-item>
            <el-form-item label="书籍价格">
              <span>￥{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="封面">
              <img referrerpolicy="never" :src="props.row.img" :alt="props.row.title">
            </el-form-item>
            <!-- <el-form-item label="上架时间">
              <span>{{ props.row.createTime }}</span>
            </el-form-item> -->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="书籍名">
      </el-table-column>
      <el-table-column prop="isbn" label="ISBN码">
      </el-table-column>
      <el-table-column prop="state" label="书籍状态">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" type="text" :disabled="scope.row.bookState !== '正常'" @click="deleteBook(scope.row.bookId, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增图书" v-model="dialogVisible" size="small">
      <el-input placeholder="输入书籍名或ISBN码" v-model="searchQuery" icon="search"
        :on-icon-click="searchByDouban.bind(this, searchQuery)">
      </el-input>
      <el-col :span="24" v-for="book in douban" :key="book.id">
        <Douban :book="book" :choose="addBook" />
      </el-col>
    </el-dialog>
  </div>
</template>

<script>
/**
 * @file 后台 - 图书列表页
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  mapGetters,
} from 'vuex';
import {
  FETCH_BOOKS,
  SEARCH_DOUBAN,
  ADD_BOOK,
} from '@/common/constants';
import Douban from '@/components/Douban.vue';

export default {
  name: 'Members',
  components: {
    Douban,
  },
  data () {
    return {
      query: null,
      // 新增会员的对话框是否可见
      dialogVisible: false,
      // 查询豆瓣的条件
      searchQuery: null,
      // 查询豆瓣得到的结果
      resultList: [],
      // 保存填写新会员的信息
      book: {},
    };
  },
  computed: mapGetters([
    'books',
    'douban',
  ]),
  mounted () {
    this.$store.dispatch(FETCH_BOOKS);
  },
  methods: {
    /**
     * 搜索图书
     */
    searchBooks () {
      const params = this.query;
      this.$store.dispatch(FETCH_BOOKS, params);
    },
    /**
     * 从豆瓣搜索图书
     * @param {string} params - 任意搜索关键字
     */
    searchByDouban (params) {
      this.$store.dispatch(SEARCH_DOUBAN, params);
    },
    /**
     * 将从豆瓣搜索到的指定图书添加到数据库
     * @param {Object} book - 图书信息
     */
    addBook (book) {
      const data = {
        title: book.title,
        price: parseFloat(book.price.match(/[1-9]\d*\.*\d*/g)[0]),
        isbn: book.isbn13,
        summary: book.summary,
        img: book.images.medium,
      };
      this.$store.dispatch(ADD_BOOK, {
        params: data,
        cb: () => {
          this.dialogVisible = false;
        },
      });
    },
    /**
     * 删除指定图书
     * @param {number} bookId - 书籍 id
     * @param {number} index - 在列表中的下标
     */
    deleteBook (bookId, index) {
      // deleteMember(memberId)
      // 	.then(res=> {
      // 		// 这里判断是否成功，如果成功就页面上也同步删除该记录，或者刷新页面。
      // 		// console.log(data);
      // 		console.log(res)
      // 		if (res.state == 'success') {
      // 			// 如果删除成功
      // 			this.memberList.splice(index, 1)
      // 		} else {
      // 			alert('删除失败,请重试')
      // 		}
      // 	})
    },
  },
};
</script>
