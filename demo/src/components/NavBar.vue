<script setup lang="ts">
import type { NavBar } from '@/utils/types'

defineProps({
  data: {
    type: Array<NavBar>,
    required: true,
  },
})
</script>

<template>
  <YkScrollbar v-if="data.length" class="nav-bar">
    <div v-for="navBar of data" :key="navBar.title" class="nav-bar-item">
      <div class="nav-bar-title">
        <yk-text strong>{{ navBar.title }}</yk-text>
      </div>
      <router-link
        v-for="item in navBar.list"
        :key="item.src"
        :to="item.src"
        class="nav-bar-list"
      >
        {{ item.name }}
      </router-link>
    </div>
  </YkScrollbar>
</template>

<style lang="less" scoped>
.nav-bar {
  position: sticky;
  top: var(--top-bar-height);
  z-index: 1;

  padding: 0 @space-l;
  min-width: var(--nav-bar-width);
  height: calc(100vh - var(--top-bar-height));
  border-right: 1px solid @line-color-s;
  background-color: @bg-color-l;
  transition: background-color @animats;
  box-sizing: border-box;

  /* stylelint-disable-next-line selector-class-pattern */
  ::v-deep(.yk-scrollbar__wrap) {
    padding-bottom: 64px;
  }

  .router-link-active {
    font-weight: bold;
    color: @pcolor;
    background-color: @pcolor-1;
  }
}

.nav-bar-title {
  overflow: hidden;
  margin-top: @space-xl;
  padding-left: @space-ss;
  height: 40px;
  line-height: 40px;
  color: @font-color-l;
}

.nav-bar-list {
  display: block;
  margin-bottom: @space-ss;
  padding: 0 @space-l;
  height: 40px;
  line-height: 40px;
  border-radius: @radius-m;
  color: @font-color-m;
  transition: background-color @animatb;

  &:hover {
    background-color: @pcolor-1;
  }

  &:last-child {
    margin-bottom: unset;
  }
}
</style>
