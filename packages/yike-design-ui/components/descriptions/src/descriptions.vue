<template>
  <div
    :class="
      bem([mergedSize], {
        border,
        vertical: direction === 'vertical',
      })
    "
  >
    <div v-if="title || $slots.title || $slots.extra" :class="bem('header')">
      <div :class="bem('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.extra" :class="bem('extra')">
        <slot name="extra" />
      </div>
    </div>

    <div :class="bem('body')" :style="bodyStyle">
      <div
        v-for="(item, index) in items"
        :key="item.key ?? index"
        :class="bem('item')"
        :style="itemStyle(item)"
      >
        <div :class="bem('label')">
          <slot name="label" :item="item">{{ item.label }}</slot>
        </div>
        <div :class="bem('value')">
          <slot name="value" :item="item">{{ item.value }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import type { CSSProperties } from 'vue'
import { createCssScope, useFormItem } from '../../utils'
import type { DescriptionItem, DescriptionsProps } from './descriptions'

defineOptions({ name: 'YkDescriptions' })

const props = withDefaults(defineProps<DescriptionsProps>(), {
  items: () => [],
  column: 3,
  border: false,
  direction: 'horizontal',
  size: 'm',
  title: undefined,
})

const { mergedSize } = useFormItem({
  size: toRef(props, 'size'),
})

const bem = createCssScope('descriptions')

const bodyStyle = computed(
  () =>
    ({
      '--yk-descriptions-column': String(Math.max(props.column, 1)),
    }) as CSSProperties,
)

function itemStyle(item: DescriptionItem): CSSProperties {
  const span = Math.min(item.span ?? 1, Math.max(props.column, 1))
  return { gridColumn: `span ${span}` }
}
</script>
