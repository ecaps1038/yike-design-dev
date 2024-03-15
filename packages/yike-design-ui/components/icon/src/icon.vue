<template>
  <svg :class="cls" :style="innerStyle" fill="currentColor">
    <slot />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, CSSProperties } from 'vue'

export default defineComponent({
  name: 'YkIcon',
  props: {
    type: String,
    size: [Number, String],
    rotate: Number,
    spin: Boolean,
  },
  setup(props) {
    const innerStyle = computed(() => {
      const styles: CSSProperties = {}
      if (props.size) {
        styles.fontSize =
          typeof props.size === 'number' ? `${props.size}px` : props.size
      }
      if (props.rotate) {
        styles.transform = `rotate(${props.rotate}deg)`
      }
      return styles
    })

    const cls = computed(() => ['yk-icon'])

    return {
      cls,
      innerStyle,
    }
  },
})
</script>
