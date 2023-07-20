<template>
  <div :class="['yk-empty', { dark: theme === 'dark' }]">
    <div class="yk-empty__image" :style="{ width: imageSize + 'px' }">
      <slot name="image">
        <img v-if="props.image" :src="image" ondragstart="return false" />
        <yk-icon
          v-else
          name="yike-kongzhuangtai0"
          :style="{ fontSize: imageSize + 'px' }"
        ></yk-icon>
      </slot>
    </div>
    <div class="yk-empty__description">
      <slot name="description">
        <p>{{ description }}</p>
      </slot>
    </div>
    <div v-if="slotDefault" class="yk-empty__bottom">
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
  image: undefined,
  imageSize: 140,
  theme: 'light',
})
</script>
