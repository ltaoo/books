<template>
  <div class="container">
    {{editedMember}}
    <el-form ref="form" :model="editedMember" :rules="rules" label-width="80px">
      <el-form-item label="会员名" prop="username">
        <el-input placeholder="请输入会员名" v-model="editedMember.username">
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input placeholder="请输入学号" v-model="editedMember.email">
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" v-model="editedMember.password">
        </el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="tel">
        <el-input placeholder="请输入联系方式" v-model="editedMember.tel">
        </el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input placeholder="请输入地址" v-model="editedMember.address">
        </el-input>
      </el-form-item>
      <el-form-item label="会员类型">
        <el-radio-group v-model="editedMember.rank">
          <el-radio :label="0">周卡</el-radio>
          <el-radio :label="1">月卡</el-radio>
          <el-radio :label="2">期卡</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm(editedMember)">确 定</el-button>
        <el-button @click="cancel('form')">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/**
 * @file 新增/编辑会员表单
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  SEARCH_MEMBER,
} from '@/common/constants';

export default {
  name: 'MemberForm',
  props: [
    'member',
    'confirm',
    'cancel',
    'update',
  ],
  data () {
    // 自定义学号校验规则，学号必须是唯一值
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      }
      // 如果是更新会员信息，当邮箱一致时不做处理
      if (this.update && this.member.email === value) {
        callback();
        return;
      }
      this.$store.dispatch(SEARCH_MEMBER, {
        params: {
          email: value,
        },
        cb: res => {
          console.log(res);
          if (res) {
            callback(new Error('该会员已存在'));
          } else {
            callback();
          }
        },
      });
    };
    return {
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
          {
            max: 5,
            message: '长度在不能超过 5 个字符',
            trigger: 'blur',
          },
        ],
        email: [
          {
            validator: checkEmail,
            trigger: 'blur',
          },
        ],
        tel: [
          {
            required: true,
            message: '请输入联系方式',
            trigger: 'blur',
          },
          {
            max: 11,
            message: '长度不能超过 11 个字符',
            trigger: 'blur',
          },
        ],
        address: [
          {
            required: true,
            message: '请输入地址',
            trigger: 'blur',
          },
        ],
        rank: [
          {
            required: true,
            message: '请选择会员类型',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {
    editedMember () {
      return {
        ...this.member,
      };
    },
  },
};
</script>
