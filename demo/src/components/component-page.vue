<script setup lang="ts">
import { shallowRef } from 'vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { AnchorOption } from 'yike-design-ui/src/components/anchor'

defineOptions({
  name: 'ComponentPage',
})

const anchors = ref<AnchorOption[]>([])
onMounted(() => {
  const h3es = document.querySelectorAll('.case-card>h3.yk-title')
  h3es.forEach((el) => {
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
    top: 100px;
    right: 0;
    width: 150px;
    height: 100%;
  }
}
</style>
