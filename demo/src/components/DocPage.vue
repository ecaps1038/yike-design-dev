<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'
import type { Ref } from 'vue'

defineOptions({
  name: 'DocPage',
})

const anchors = ref<any[]>([])
const docRef = ref<HTMLElement>()
const hasNavBar = inject<Ref>('hasNavBar')

onMounted(() => {
  const docNode = docRef.value
  const wrapperNode = docNode.children[0] as HTMLElement
  const docH3es = wrapperNode.querySelectorAll('h3.yk-title[id]')

  Array.from(docH3es).forEach((el: HTMLElement) => {
    anchors.value.push({
      href: '#'.concat(el.id),
      title: el.id.replace(/-/g, ' '),
    })
  })
})
</script>

<template>
  <div ref="docRef" class="yk-demo-doc" :class="{ width1200: !hasNavBar }">
    <div ref="wrapperRef" class="wrapper">
      <slot />
    </div>
    <div ref="anchorRef" class="anchor-wrap">
      <YkAnchor :options="anchors" :scrollbar="true" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.yk-demo-doc {
  --anchor-width: 212px;
  flex: 1;
  padding: 32px 64px;
  padding-right: 0;
  width: calc(var(--nav-bar-width));
  transition: all 0.2s;

  .wrapper {
    float: left;
    width: calc(100% - var(--anchor-width));
  }

  .anchor-wrap {
    position: fixed;
    top: 88px;
    right: 0;
    float: left;
    margin-top: 88px;
    padding-right: 14px;
    padding-left: 56px;
    width: var(--anchor-width);
  }

  @media (810px < width <= 1200px) {
    padding-left: 32px;
  }

  @media (width <= 810px) {
    padding: 24px;

    .wrapper {
      width: 100%;
    }

    .anchor-wrap {
      display: none;
    }
  }
}

.width1200 {
  max-width: 1200px;
}
</style>
