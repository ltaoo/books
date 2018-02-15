<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="_item.bookImg" style="float: left;">
    <div style="float: left; padding: 10px;">
      <router-link class="goods__link" :to="{ path: '/goods/' + _item.bookId }">{{_item.bookTitle}}</router-link>
      <p class="goods__price">
        <span>原价：
          <del>￥{{_item.bookPrice}}</del>
        </span>
        <span>现价：￥{{_item.newPrice}}</span>
      </p>
      <div class="bottom clearfix">
        <time class="time">{{item._createTime}}</time>
        <el-button @click="choose(_item)">加入购物车</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
/**
 * 商品卡片
 */
import {
  computedPriceByTimes,
} from '@/utils/index';

export default {
  // 组件名
  name: 'Goods',
  // 从父组件传过来的属性
  props: [
    'item',
    'choose',
  ],
  computed: {
    _item () {
      const {
        originPrice,
        times,
      } = this.item;
      const newPrice = computedPriceByTimes(originPrice, times);
      return Object.assign({}, this.item, {
        newPrice,
      });
    },
  },
};
</script>
<style>
.goods__link {
  text-decoration: none;
}
.goods__link:link {
  color: #000;
}
.goods__link:visited {
  color: #000;
}
</style>
