<template>
  <div class="yk-icon-list">
    <div v-for="icon in ykIconList" class="yk-icon-container">
      <yk-icon :name="icon"></yk-icon>
      <div class="yk-icon-name">{{ icon }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const ykIconList = [
  'yike-paihang',
  'yike-geshishua',
  'yike-jingbao',
  'yike-huangguan',
  'yike-vip',
  'yike-renzhengy',
  'yike-jiangbei',
  'yike-yuedu',
  'yike-anquan',
  'yike-anquan1',
  'yike-daiban',
  'yike-biaoqian',
  'yike-dengpao',
  'yike-gouwudai',
  'yike-guangbo',
  'yike-kapian',
  'yike-gouwuche',
  'yike-qianbao',
  'yike-renyuanxinxi',
  'yike-liwu',
  'yike-shuqian',
  'yike-riqi',
  'yike-github',
  'yike-yikedesign',
  'yike-gou',
  'yike-shangchuan',
  'yike-bofang',
  'yike-quanjia',
  'yike-cha',
  'yike-zanting',
  'yike-jinggao',
  'yike-tixing',
  'yike-biaoqing',
  'yike-biyan',
  'yike-dianzan',
  'yike-dingwei',
  'yike-fanhui1',
  'yike-gengduo',
  'yike-fenxiang',
  'yike-jiantouxiangxia',
  'yike-lingdang',
  'yike-fanhui',
  'yike-shijian',
  'yike-qian',
  'yike-suo',
  'yike-saoma',
  'yike-shezhi',
  'yike-qun',
  'yike-taiyang',
  'yike-wenjian',
  'yike-touxiang',
  'yike-tongji',
  'yike-xiazai',
  'yike-xiangyou',
  'yike-mubiao',
  'yike-xiangxia',
  'yike-xiangji',
  'yike-youjian',
  'yike-yanjing',
  'yike-tianxie',
  'yike-xin',
  'yike-tuichu',
  'yike-wenjianjiakai',
  'yike-wenjianjiaguan',
  'yike-wenjianjiajia',
  'yike-xiangzuo',
  'yike-yiwen',
  'yike-huohuo',
  'yike-wujiaoxing',
  'yike-yueliang',
  'yike-yingyong',
  'yike-xiangshang',
  'yike-xiugai',
  'yike-zhuye',
  'yike-yike2',
  'yike-yike1',
  'yike-tupian',
  'yike-zhuce',
]
</script>
<style lang="less">
@import '@/style/base.less';
.yk-icon-list {
  width: 100% !important;
  overflow: hidden;
  *zoom: 1;
  display: flex;
  flex-wrap: wrap;
  padding-inline-start: 0px;
  .yk-icon-container {
    width: 160px;
    padding: 16px;
    text-align: center;
    list-style: none !important;
    border: 0.8px solid @line-color-s;
    cursor: default;
    svg {
      display: block;
      height: 64px;
      line-height: 64px;
      font-size: 32px;
      margin: 0 auto 10px;
      color: @font-color-l;
      transition: font-size 0.1s linear, width 0.1s linear;
    }
    svg:hover {
      font-size: 42px;
    }
  }
  .yk-icon-name {
    color: @font-color-m;
  }
}
</style>
