<template>
  <div ref="targetRef" class="yk-wrapper">
    <div class="yk-scroll-wrapper">
      <yk-affix :offset="30" :target="targetRef" style="margin-top: 60px">
        <yk-button>Affix Top in container</yk-button>
      </yk-affix>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { shallowRef } from 'vue'
const targetRef = shallowRef<HTMLElement>()
</script>
<style scoped>
.yk-wrapper {
  overflow: auto;
  height: 200px;
}
.yk-scroll-wrapper {
  height: 400px;
}
</style>
