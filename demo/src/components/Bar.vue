<script setup lang="ts">
import { RouterLink } from 'vue-router'
defineProps({
  bar: {
    // default: {},
    type: Array,
    required: true,
  },
})
//获取屏幕body高度
// let bodyHeight = document.body.clientHeight
</script>
<template>
  <div class="component-bar">
    <yk-container class="container">
      <div v-for="(e, i) in bar" :key="i" class="bar-card">
        <div class="bar-title">
          <yk-text strong>{{ (e as any).title }}</yk-text>
        </div>
        <RouterLink
          v-for="(n, j) in (e as any).list"
          :key="j"
          class="bar-list"
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
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 1;
  width: 268px;
  height: 100%;
  border-right: 1px solid @line-color-s;
  background-color: @bg-color-l;
  transition: background-color @animats, border-right @animats;

  .container {
    padding: 0 @space-m;
    // fix height error
    height: calc(100% - 60px);
    // overflow: auto;
  }

  .bar-card {
    padding: @space-s 0 @space-xl;
  }

  .bar-title {
    margin-top: @space-m;
    padding-left: @space-m;
    height: 40px;
    line-height: 40px;
    color: @font-color-l;
  }

  .bar-list {
    display: block;
    margin-bottom: 5px;
    padding: 0 @space-m;
    height: 40px;
    border-radius: @radius-m;
    color: @font-color-m;
    transition: color @animats;
    line-height: 40px;

    &:hover {
      background-color: rgb(21 114 255 / 10%);
    }

    &:last-child {
      margin-bottom: unset;
    }
  }

  .router-link-active {
    font-weight: 600;
    color: @pcolor;
    background-color: rgb(21 114 255 / 10%);
  }

  .select {
    font-weight: 600;
    color: @pcolor;
    background-color: rgb(21 114 255 / 10%);
  }
}
</style>
