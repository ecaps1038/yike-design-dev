<template>
  <div class="yk-empty">
    <div class="yk-empty__image" :style="imageStyle">
      <slot name="image">
        <img v-if="image" :src="image" ondragstart="return false" />
        <IconEmpty1Color v-if="!image && type == 'primary'" class="primary" />
        <IconEmpty2Color
          v-if="!image && type == 'secondary'"
          class="secondary"
        />
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
import { CSSProperties, computed } from 'vue'
import { IconEmpty1Color, IconEmpty2Color } from '../../svg-icon'
import { EmptyProps } from './empty'
import '../style'

defineOptions({
  name: 'YkEmpty',
})

const props = withDefaults(defineProps<EmptyProps>(), {
  description: 'No Data',
  image: '',
  imageStyle: () => ({}),
  type: 'primary',
})

computed<CSSProperties>(() => {
  return {
    ...props.imageStyle,
    fontSize: props.imageStyle?.width,
  }
})
</script>
