<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps({

})


onMounted(() => {
})

</script>

<template>
  <div class="yk-carouselItem" ref="carouselItem">
    <slot></slot>
  </div>
</template>

<style lang="less">

</style>