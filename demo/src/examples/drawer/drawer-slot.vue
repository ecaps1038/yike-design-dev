<template>
  <yk-space>
    <yk-button @click="avtivate('right')">打开抽屉</yk-button>
  </yk-space>
  <yk-drawer :placement="placement" :show="active" @close="active = false">
    <template #header>
      <h2>
        <IconBulbOutline />
        非常大的字
      </h2>
    </template>
    <h3>你看到了什么？</h3>
    <template #footer>
      <yk-button>我知道了</yk-button>
    </template>
  </yk-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const active = ref(false)
let placement = ref<string>('right')
const avtivate = (placement_to: string) => {
  placement.value = placement_to
  active.value = true
}
</script>
