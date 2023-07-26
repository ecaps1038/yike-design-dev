<template>
  <div class="yk-icon-list">
    <div
      v-for="iconName in ykIconList"
      class="yk-icon-container"
      @click="onCopy(iconName)"
    >
      <yk-icon :name="iconName"></yk-icon>
      <div class="yk-icon-name">{{ iconName }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { copyText } from '@/utils/tools'
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
const onCopy = (iconName: string) => {
  copyText(iconName)
  proxy.$message({ type: 'success', message: '已复制' })
}
const ykIconList = [
  'yike-kongzhuangtai0',
  'yike-kongzhuangtai1',
  'yike-yidong1',
  'yike-yidong2',
  'yike-zuo',
  'yike-you',
  'yike-shang',
  'yike-xia',
  'yike-paihang',
  'yike-geshishua',
  'yike-jingbao',
  'yike-huangguan',
  'yike-vip',
  'yike-renzheng',
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
  'yike-word',
  'yike-pdf',
  'yike-excel',
  'yike-ppt',
  'yike-shipin',
  'yike-yinpin',
  'yike-txt',
]
</script>
