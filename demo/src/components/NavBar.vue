<script setup lang="ts">
import type { NavBar } from '@/utils/types'
import { computed, ref } from 'vue'

defineProps({
  data: {
    type: Array<NavBar>,
    required: true,
  },
})

const isCollapsed = ref(true)
const navbarClass = computed(() => {
  return {
    'nav-bar': true,
    'nav-bar-show': !isCollapsed.value,
  }
})
</script>

<template>
  <div :class="navbarClass">
    <YkButton
      class="nav-bar-toggle"
      type="secondary"
      @click="isCollapsed = !isCollapsed"
    >
      <IconCollapseOutline v-if="!isCollapsed" />
      <IconExpandOutline v-else />
    </YkButton>
    <YkScrollbar v-if="data.length">
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
  </div>
</template>

<style lang="less" scoped>
.nav-bar {
  position: sticky;
  top: var(--top-bar-height);
  z-index: 1;

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

  .yk-scrollbar {
    padding: 0 @space-l;
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

.nav-bar-toggle {
  display: none;
}

/* stylelint-disable-next-line media-feature-range-notation */
@media (max-width: 810px) {
  .nav-bar {
    position: fixed;
    z-index: 120;
    transform: translateX(-268px);
    transition: transform @animats;
  }

  .nav-bar-toggle {
    position: absolute;
    top: 80px;
    left: calc(var(--nav-bar-width) - 1px);
    display: block;
    border: 1px solid @gray-1;
    border-radius: 0 @radius-s @radius-s 0 !important;
    background-color: @bg-color-l;
  }

  .nav-bar-show {
    transform: translateX(0);
  }
}
</style>
