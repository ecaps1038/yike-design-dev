<template>
  <div class="yk-container">
    <slot> </slot>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  height: {
    type: String,
    default: 'auto',
  }
})

//获取屏幕body高度
let bodyHeight = document.body.clientHeight;

</script>
<style lang="less" scoped>
@import '../../assets/style/yk-index.less';

.yk-container {
  overflow:auto;

  // padding-right:12px;
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
    }
  }
}

.yk-container::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}

.yk-container::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);

}

.yk-container::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 4px;
  background: rgba(0, 0, 0, 0);
}
</style>

