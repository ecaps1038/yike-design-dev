<script setup lang="ts">
import { RouterLink } from 'vue-router'
defineProps({
  bar: {
    type: Array,
  },
})
//获取屏幕body高度
// let bodyHeight = document.body.clientHeight
</script>
<template>
  <div class="component-bar">
    <yk-container class="container">
      <div class="bar-card" v-for="(e, i) in bar" :key="i">
        <div class="bar-title">
          <Text b>{{ (e as any).title }}</Text>
        </div>
        <RouterLink
          class="bar-list"
          v-for="(n, j) in (e as any).list"
          :key="j"
          :to="n.src"
        >
          {{ n.name }}
        </RouterLink>
      </div>
    </yk-container>
  </div>
</template>
<style lang="less" scoped>
.component-bar {
  height: 100%;
  width: 268px;
  border-right: 1px solid @line-color-s;
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 1;
  background-color: @bg-color-l;
  transition: background-color @animats, border-right @animats;

  .container {
    // fix height error
    height: calc(100% - 60px);
    padding: @space-s @space-m;
    // overflow: auto;
  }

  .bar-title {
    margin-top: @space-m;
    height: 40px;
    line-height: 40px;
  }

  .bar-list {
    height: 40px;
    border-radius: @radius-m;
    line-height: 40px;
    padding: 0 @space-m;
    display: block;
    color: @font-color-m;
    transition: color @animats;
  }

  .router-link-active {
    font-weight: 600;
    color: @pcolor;
    background-color: rgba(21, 114, 255, 0.1);
  }

  .select {
    font-weight: 600;
    color: @pcolor;
    background-color: rgba(21, 114, 255, 0.1);
  }
}
</style>
