<template>
  <div :class="['yk-empty', { dark: theme === 'dark' }]">
    <div class="yk-empty__image" :style="imageStyle">
      <slot name="image">
        <img v-if="image" :src="image" ondragstart="return false" />
        <yk-icon
          v-else
          name="yike-kongzhuangtai0"
          :style="defaultStyle"
        ></yk-icon>
      </slot>
    </div>
    <div class="yk-empty__description">
      <slot name="description">
        <p>{{ description }}</p>
      </slot>
    </div>
    <div class="yk-empty__bottom">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import '../style'
import { CSSProperties, computed } from 'vue'
import { EmptyProps } from './empty'

defineOptions({
  name: 'YkEmpty',
})
const props = withDefaults(defineProps<EmptyProps>(), {
  description: 'No Data',
  image: '',
  imageStyle: () => ({ width: '140px' }),
  theme: 'light',
})

const defaultStyle = computed<CSSProperties>(() => {
  return {
    ...props.imageStyle,
    fontSize: props.imageStyle?.width,
  }
})
</script>
