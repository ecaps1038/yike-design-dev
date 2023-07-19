<script setup lang="ts">
import { useActiveTocLinks } from '../composables/toc'
import { ref } from 'vue'

defineProps<{
  toc: string
}>()

const container = ref()
const marker = ref()
useActiveTocLinks(container, marker)
</script>

<template>
  <div ref="container" class="toc">
    <div class="toc-title">示例</div>
    <ul>
      <li v-for="item in toc.split(',')" key="item" class="toc-item">
        <a class="toc-link" :title="item.replace('-', ' ')" :href="`#${item}`">
          {{ item.replace('-', ' ') }}
        </a>
      </li>
    </ul>
    <div ref="marker" class="toc-marker">></div>
  </div>
</template>

<style scoped lang="less">
.toc {
  position: fixed;
  top: 76px;
  right: 50%;
  transform: translate(670px);
  .toc-title {
    padding: 5px 0;
    font-size: 14px;
    font-weight: 600;
  }
  .toc-marker {
    position: absolute;
    left: -15px;
    color: rgb(var(--pcolor));
  }
  ul,
  li {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
    .toc-link {
      height: 40px;
      border-radius: 8px;
      line-height: 40px;
      display: block;
      color: rgba(var(--gray1), 0.72);
      transition: color 0.3s;
      &.active {
        color: rgb(var(--pcolor));
      }
    }
  }
}
@media screen and (max-width: 1440px) {
  .toc {
    display: none;
  }
}
</style>
