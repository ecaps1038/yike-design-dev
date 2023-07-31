<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'ComponentPage',
})

const anchors = ref<any[]>([])
onMounted(() => {
  const h3es = document.querySelectorAll('.case-card>h3.yk-title')
  const docH3es = document.querySelectorAll('.yk-demo-doc>h3.yk-title')

  h3es.forEach((el) => {
    anchors.value.push({
      href: `#${el.id}`,
      title: el.id,
    })
  })

  docH3es.forEach((el) => {
    anchors.value.push({
      href: `#${el.id}`,
      title: el.id,
    })
  })
})
</script>

<template>
  <div class="yk-demo-doc">
    <slot />
    <div class="anchor-wrap">
      <YkAnchor :options="anchors" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.yk-demo-doc {
  position: relative;

  .anchor-wrap {
    position: fixed;
    top: 88px;
    right: 0;
    width: 168px;
    height: 100%;
  }
}
</style>
