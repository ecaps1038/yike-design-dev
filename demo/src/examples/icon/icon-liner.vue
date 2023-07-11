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
  'yk-jingbao',
  'yk-yifu',
  'yk-jiangbei',
  'yk-shuju',
  'yk-paihang',
  'yk-huangguan',
  'yk-vip',
  'yk-geshishua',
  'yk-dengpao',
  'yk-yuedu',
  'yk-anquan',
  'yk-daiban',
  'yk-biaoqian',
  'yk-anquan1',
  'yk-guangbo',
  'yk-kapian',
  'yk-gouwudai',
  'yk-gouwuche',
  'yk-qianbao',
  'yk-liwu',
  'yk-shuqian',
  'yk-nan',
  'yk-nv',
  'yk-riqi',
  'yk-renyuanxinxi',
  'yk-zuoxuanzhuan',
  'yk-caidan',
  'yk-zhankai',
  'yk-shouqi',
  'yk-xiexian',
  'yk-daima',
  'yk-kaobei',
  'yk-biaoqing',
  'yk-fanhui',
  'yk-dingwei',
  'yk-cha',
  'yk-gengduo',
  'yk-bofang',
  'yk-fenxiang',
  'yk-gou1',
  'yk-jiahao',
  'yk-jianhao',
  'yk-gou2',
  'yk-jiantouxiangxia',
  'yk-guanji',
  'yk-biyan',
  'yk-jiazai',
  'yk-lingdang',
  'yk-mubiao',
  'yk-jinggao',
  'yk-quanjia',
  'yk-quancha',
  'yk-quanxiangyou',
  'yk-quanxiangzuo',
  'yk-quangou',
  'yk-pinglun',
  'yk-saoma',
  'yk-qian',
  'yk-shanchu',
  'yk-qun',
  'yk-shezhi',
  'yk-shijian',
  'yk-sousuo',
  'yk-shangchuan',
  'yk-shangchuan1',
  'yk-taiyang',
  'yk-tupian',
  'yk-tishi',
  'yk-tianxie',
  'yk-touxiang1',
  'yk-shuaxin1',
  'yk-touxiang2',
  'yk-tongji',
  'yk-wenjianjiajia',
  'yk-wenjianjiaguan',
  'yk-wenjian',
  'yk-fangda1',
  'yk-suoxiao1',
  'yk-fangda',
  'yk-suoxiao',
  'yk-xiangshang',
  'yk-wenjianjiakai',
  'yk-shuaxin',
  'yk-xiangzuo',
  'yk-xiangxia',
  'yk-xiazai1',
  'yk-suo',
  'yk-xiazai',
  'yk-a-xiangxia2',
  'yk-wujiaoxing',
  'yk-xin',
  'yk-a-xiangshang2',
  'yk-xinxi',
  'yk-xiangyou',
  'yk-tuichu',
  'yk-yanjing',
  'yk-yingyong',
  'yk-xiangji',
  'yk-xiugai',
  'yk-youxuanzhuan',
  'yk-zan',
  'yk-youjian',
  'yk-zhuce',
  'yk-yueliang',
  'yk-zhuce2',
  'yk-zanting',
  'yk-yiwen',
  'yk-zhuye',
  'yk-yike2',
  'yk-yike1',
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
