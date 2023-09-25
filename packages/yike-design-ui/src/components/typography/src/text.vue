<template>
  <component :is="tag" :class="bem([type, _tag, ...classList])">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { textProps } from './typography'
import { createCssScope } from '../../utils'

defineOptions({
  name: 'YkText',
})

const bem = createCssScope('text')
// prettier-ignore
const props = withDefaults(
  defineProps<textProps>(), 
  {
    mark: false,
    strong: false,
    underline: false,
    del: false,
  }
)

const TagMap = { ...props, type: false }
const [_tag, ...classList] = Object.entries(TagMap)
  .filter((item) => item[1])
  .map((item) => item[0])
const tag = _tag || 'span'
</script>
