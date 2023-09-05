<script setup lang="ts">
import { onMounted, ref, nextTick, inject } from 'vue'
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
  const anchorNode = docNode.childNodes[1] as HTMLElement
  const docH3es = wrapperNode.querySelectorAll('h3.yk-title[id]')

  Array.from(docH3es).forEach((el: HTMLElement) => {
    anchors.value.push({
      href: `#${el.id}`,
      title: el.id,
    })
  })

  nextTick(() => {
    docNode.style.setProperty(
      '--anchor-width',
      `${anchorNode.offsetWidth + 10}px`,
    )
  })
})
</script>

<template>
  <div ref="docRef" class="yk-demo-doc" :class="{ 'width-1200': !hasNavBar }">
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
  flex: 1;
  padding: 0 0 64px 64px;

  .wrapper {
    float: left;
    width: calc(100% - var(--anchor-width));
  }
}

.width-1200 {
  max-width: 1200px;
}

.anchor-wrap {
  position: sticky;
  top: 138px;
  float: left;
  padding: 0 64px 0 32px;
  width: var(--anchor-width);
}

/* stylelint-disable-next-line media-feature-range-notation */
@media (max-width: 810px) {
  .yk-demo-doc {
    padding: unset;

    .wrapper {
      padding: 0 8px;
      width: 100vw;
    }

    .anchor-wrap {
      display: none;
    }
  }
}
</style>
