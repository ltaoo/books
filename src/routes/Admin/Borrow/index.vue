<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input
          placeholder="请输入会员姓名或学号"
          icon="search"
          v-model="memberQuery"
          :on-icon-click="searchMember.bind(this, memberQuery)"
        >
        </el-input>
        <MemberList :members="memberRes" :choose="chooseMember" />
      </el-col>
      <el-col :span="12">
        <el-input
          placeholder="请输入书籍名或ISBN码"
          icon="search"
          v-model="bookQuery"
          :on-icon-click="searchBook.bind(this, bookQuery)"
        >
        </el-input>
        <BookList :books="bookRes" :choose="chooseBook" />
      </el-col>
    </el-row>
    <el-dialog title="请确认以下信息" v-model="dialogVisible" size="small">
      <p>
        <span>{{choosedMember.memberName}}</span> 借阅
        <span>{{choosedBook.bookTitle}}</span>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="borrow(choosedMember, choosedBook)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
/**
 * @file 后台首页，借阅图书
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  mapGetters,
} from 'vuex';

import MemberList from '@/components/MemberList.vue';
import BookList from '@/components/BookList.vue';
import {
  SEARCH_MEMBER,
  SEARCH_BOOKS,
  CREATE_RECORD,
} from '@/common/constants';

export default {
  // 组件名
  name: 'Index',
  components: {
    MemberList,
    BookList,
  },
  data () {
    return {
      memberQuery: null,
      bookQuery: null,
      // 模态框
      dialogVisible: false,
      // 点击的会员
      choosedMember: {},
      // 点击的书籍
      choosedBook: {},
    };
  },
  computed: mapGetters([
    'bookRes',
    'memberRes',
  ]),
  methods: {
    /**
     * 搜索会员
     */
    searchMember (param) {
      // 先判断输入是否有效，只判断是否输入，sql注入暂时不考虑
      if (!param || !param.trim()) {
        // 如果没有输入搜索内容，就显示错误提示
        this.$message({
          message: '请输入查询条件',
          type: 'warning',
        });
        return;
      }
      this.$store.dispatch(SEARCH_MEMBER, {
        params: {
          num: this.memberQuery,
        },
      });
    },
    /**
     * 搜索图书
     */
    searchBook (param) {
      if (!param || !param.trim()) {
        this.$message({
          message: '请输入查询条件',
          type: 'warning',
        });
        return false;
      }
      this.$store.dispatch(SEARCH_BOOKS, {
        params: {
          title: this.bookQuery,
        },
      });
    },
    /**
     * 选择会员，由于此次选择只和当前页面有关，所以没有必要 dispatch(SELECT_MEMBER) 保存在 store 里面吧
     */
    chooseMember (member) {
      this.choosedMember = member;
    },
    /**
     * 选择图书，弹出模态框用以确认是否借阅
     */
    chooseBook (book) {
      this.choosedBook = book;
      // 这里只是处理list组件点击了借阅事件，接下来的判断还是由index来处理
      if (this.choosedMember.memberName) {
        this.dialogVisible = true;
      } else {
        this.$message({
          message: '请先选择会员',
          type: 'info',
        });
      }
    },
    /**
     * 生成借阅记录
     */
    borrow (member, book) {
      this.$store.dispatch(CREATE_RECORD, {
        params: {
          member: member.memberId,
          book: book.bookId,
        },
        cb: () => {
          this.dialogVisible = false;
          this.memberQuery = '';
          this.bookQuery = '';
        },
      });
    },
  },
};
</script>
