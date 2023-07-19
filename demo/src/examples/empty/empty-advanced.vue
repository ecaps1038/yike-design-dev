<template>
  <yk-empty :image="adv" :image-style="imageStyle"></yk-empty>
</template>
<script setup lang="ts">
import { CSSProperties } from 'vue'
import { YkEmpty } from 'yk-design-ui'
const adv: string = YkEmpty.ADVANCED_EMPTY
const imageStyle: CSSProperties = { width: '120px', height: '120px' }
</script>
