<template>
  <div class="yk-empty">
    <div class="yk-empty__image" :style="{ width: imageSize + 'px' }">
      <slot name="image">
        <img :src="image" ondragstart="return false" />
      </slot>
    </div>
    <div class="yk-empty__description">
      <slot name="description">
        <p>{{ description }}</p>
      </slot>
    </div>
    <div class="yk-empty__bottom" v-if="slotDefault">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import '../style'
import { useSlots } from 'vue'
import { EmptyProps } from './empty'
defineOptions({
  name: 'YkEmpty',
})
const slotDefault = !!useSlots().default

const props = withDefaults(defineProps<EmptyProps>(), {
  description: 'No Data',
  image: '/src/assets/icon/玉子(empty).svg',
  imageSize: 160,
})
</script>
