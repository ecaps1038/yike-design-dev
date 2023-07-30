<template>
  <div ref="targetRef" class="yk-wrapper">
    <div class="yk-scroll-wrapper">
      <yk-affix
        ref="affixRef"
        :offset="30"
        :target="targetRef"
        style="margin-top: 60px"
      >
        <yk-button>Affix Top in container</yk-button>
      </yk-affix>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { shallowRef, onMounted, onUnmounted } from 'vue'
const targetRef = shallowRef<HTMLElement>()
const affixRef = shallowRef()
onMounted(() => {
  window.addEventListener('scroll', affixRef.value?.updatePosition, true)
})
onUnmounted(() => {
  window.removeEventListener('scroll', affixRef.value?.updatePosition, true)
})
</script>
<style scoped>
.yk-wrapper {
  overflow: auto;
  height: 200px;
}
.yk-scroll-wrapper {
  overflow: hidden;
  height: 400px;
  background-color: #d4e1ff;
}
</style>
