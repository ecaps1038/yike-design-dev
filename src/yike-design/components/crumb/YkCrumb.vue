<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CrumbItem from './CrumbItem.vue'

const props = defineProps({
  routes: {
    type: Array
  },
})
//单独使用
const crumb = ref(null)

//获取dome元素添加特定样式
const addStyle = () => {
  //将获取的dome转为数组
  let crumbs:any=crumb.value
  let arr:any[] = Array.from(crumbs.children)
  //给最后一个元素添加class
  arr[arr.length - 1].classList.add('last-item')
};

onMounted(() => {
  addStyle();
})
</script>

<template>
  <div class="yk-crumb" ref="crumb">
    <slot></slot>
    <CrumbItem v-if="routes" v-for="(r, index) in routes" :key="index" :path="(r as any).path">
      {{ (r as any).name }}
    </CrumbItem>
  </div>
</template>
<style lang="less" scoped>
@import '../../assets/style/yk-index.less';
</style>