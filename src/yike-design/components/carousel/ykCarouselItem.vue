<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: 'auto',
  },
  height: {
    type: String,
    default: 'auto',
  },
  src: {
    type: String,
    default: null,
  },
  style: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="yk-carouselItem" ref="carouselItem">
    <slot></slot>
  </div>
</template>

<style lang="less"></style>